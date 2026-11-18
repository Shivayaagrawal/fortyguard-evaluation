import { creditCost, type EndpointContract, type Plan } from "./endpoints.js";
import { apiKeyHeaders } from "./authentication.js";
import { logInfo } from "../utils/logger.js";
import { recordExchange } from "../utils/response-recorder.js";
import { envFlag, readNumberEnv, requireEnv } from "../utils/test-helpers.js";

export class PaidCallRefused extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaidCallRefused";
  }
}

export function assertPaidCallAllowed(endpoint: EndpointContract, plan: Plan): number {
  const cost = creditCost(endpoint, plan);
  if (cost === null) {
    throw new PaidCallRefused(
      `${endpoint.path} is not included on the ${plan} plan in the published matrix.`,
    );
  }
  if (cost > 0 && !envFlag("FORTYGUARD_ALLOW_PAID")) {
    throw new PaidCallRefused(
      `Refusing ${endpoint.method} ${endpoint.path}. Documented cost is ${cost} credits on ${plan}. Set FORTYGUARD_ALLOW_PAID=true only after the balance is checked.`,
    );
  }
  const budget = readNumberEnv("FORTYGUARD_CREDIT_BUDGET");
  if (budget !== undefined && cost > budget) {
    throw new PaidCallRefused(
      `Refusing ${endpoint.path}. Documented cost ${cost} exceeds FORTYGUARD_CREDIT_BUDGET ${budget}.`,
    );
  }
  return cost;
}

export interface ApiResult {
  status: number;
  body: unknown;
  evidencePath: string;
}

/**
 * Network entry point for Phase 3.
 * Tests do not call this during planning. The paid-call guard runs before fetch.
 */
export async function sendApiRequest(
  endpoint: EndpointContract,
  options: {
    plan: Plan;
    path?: string;
    body?: unknown;
    chargeable?: boolean;
  },
): Promise<ApiResult> {
  if (options.chargeable !== false) {
    assertPaidCallAllowed(endpoint, options.plan);
  }

  const baseUrl = requireEnv("FORTYGUARD_API_BASE_URL").replace(/\/$/, "");
  const path = options.path ?? endpoint.path;
  const url = `${baseUrl}${path}`;
  logInfo("api request", { method: endpoint.method, path });

  const request: RequestInit = {
    method: endpoint.method,
    headers: apiKeyHeaders(),
  };
  if (options.body !== undefined) {
    request.body = JSON.stringify(options.body);
  }
  const response = await fetch(url, request);

  const text = await response.text();
  let body: unknown = text;
  try {
    body = JSON.parse(text);
  } catch {
    body = { nonJson: true, length: text.length };
  }

  const evidencePath = await recordExchange({
    at: new Date().toISOString(),
    product: "api",
    name: endpoint.id,
    request: { method: endpoint.method, path, body: options.body ?? null },
    response: { status: response.status, body },
  });

  return { status: response.status, body, evidencePath };
}

export type HttpMethod = "GET" | "POST";
export type Plan = "basic" | "startup" | "premium";

export interface CreditCost {
  basic: number | null;
  startup: number | null;
  premium: number | null;
}

export interface EndpointContract {
  id: string;
  method: HttpMethod;
  path: string;
  purpose: string;
  async: boolean;
  plans: Plan[];
  credits: CreditCost;
  /** Lowest-cost way to learn about this endpoint during the evaluation. */
  evaluationOrder: "validation-only" | "read-existing" | "paid-last";
  notes: string[];
}

/**
 * Inventory taken from indexed FortyGuard API documentation on 2026-11-17.
 * The live docs host returned HTTP 504, so this table is provisional until
 * each page is re-read and one runtime response is recorded.
 * `null` credit means the published plan matrix says the capability is not included.
 */
export const ENDPOINTS: readonly EndpointContract[] = [
  {
    id: "heatmap",
    method: "POST",
    path: "/v1/heatmap",
    purpose: "Submit an area temperature heatmap.",
    async: true,
    plans: ["basic", "startup", "premium"],
    credits: { basic: 3500, startup: 3500, premium: 4220 },
    evaluationOrder: "paid-last",
    notes: [
      "Basic and Startup area cap documented as 10 mi². Premium documented as 50 mi².",
      "Documented polygon examples disagree: FeatureCollection versus a bare Polygon.",
      "Granularity documented as 60, 80, or 100 metres, while result notes also discuss 20 m tiles.",
    ],
  },
  {
    id: "env-params",
    method: "POST",
    path: "/v1/env_params",
    purpose: "Submit point environmental parameters.",
    async: true,
    plans: ["basic", "startup", "premium"],
    credits: { basic: 2110, startup: 2110, premium: 2900 },
    evaluationOrder: "paid-last",
    notes: [
      "Cheapest documented successful call, and still above 2,000 credits.",
      "Basic and Startup are documented as limited to 3 analysis parameters.",
      "Requires a caller-supplied temperature in Celsius.",
      "REST quickstart describes every POST as an activity. MCP docs describe env_params as direct.",
    ],
  },
  {
    id: "status",
    method: "GET",
    path: "/v1/status/{activity_id}",
    purpose: "Read an existing activity.",
    async: false,
    plans: ["basic", "startup", "premium"],
    credits: { basic: 0, startup: 0, premium: 0 },
    evaluationOrder: "read-existing",
    notes: [
      "Documented statuses are Processing, Completed, and Failed.",
      "The quickstart sample also treats succeeded and error as terminal.",
      "Large heatmaps can request result_delivery=links.",
      "A missing activity is documented as 404 and should not be charged. Confirm before relying on that.",
    ],
  },
  {
    id: "routing",
    method: "POST",
    path: "/v1/routing",
    purpose: "Submit a temperature-aware driving route.",
    async: true,
    plans: ["premium"],
    credits: { basic: null, startup: null, premium: 3500 },
    evaluationOrder: "paid-last",
    notes: [
      "Premium only.",
      "Straight-line origin-to-destination distance documented as 200 km maximum.",
      "Requires origin, destination, and an ISO-8601 departure_time.",
    ],
  },
  {
    id: "heat-intelligence",
    method: "POST",
    path: "/v1/heat_intelligence",
    purpose: "Submit a Heat Intelligence PDF report.",
    async: true,
    plans: ["premium"],
    credits: { basic: null, startup: null, premium: 8600 },
    evaluationOrder: "paid-last",
    notes: [
      "Premium only. Completed result is a temporary download_link, not the PDF body.",
      "The same page says temperature is Fahrenheit and that the date applies to a Celsius temperature.",
      "MCP names the equivalent tool report and documents temperature as Celsius.",
    ],
  },
  {
    id: "streetview",
    method: "POST",
    path: "/v1/streetview",
    purpose: "Submit street-level imagery segmentation.",
    async: true,
    plans: ["premium"],
    credits: { basic: null, startup: null, premium: 8600 },
    evaluationOrder: "paid-last",
    notes: [
      "Premium only.",
      "Requires latitude, longitude, vertical_angle, horizontal_angle, and back_view.",
      "No date_time field is documented, unlike satellite.",
    ],
  },
  {
    id: "satellite",
    method: "POST",
    path: "/v1/satellite",
    purpose: "Submit satellite imagery segmentation.",
    async: true,
    plans: ["premium"],
    credits: { basic: null, startup: null, premium: 14400 },
    evaluationOrder: "paid-last",
    notes: [
      "Most expensive documented call. Do not use it for the first successful test.",
      "Location is nested under sat.latitude and sat.longitude.",
      "Optional granularity includes 20, 60, 80, and 100.",
    ],
  },
];

export function creditCost(endpoint: EndpointContract, plan: Plan): number | null {
  return endpoint.credits[plan];
}

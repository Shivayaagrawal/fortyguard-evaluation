import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { redact } from "./logger.js";

export interface RecordedExchange {
  at: string;
  product: "api" | "mcp" | "dashboard";
  name: string;
  request: unknown;
  response: unknown;
}

const EVIDENCE_ROOT = path.resolve(process.cwd(), "evidence");

export async function recordExchange(exchange: RecordedExchange): Promise<string> {
  const directory = path.join(EVIDENCE_ROOT, exchange.product);
  await mkdir(directory, { recursive: true });
  const stamp = exchange.at.replace(/[:.]/g, "-");
  const filePath = path.join(directory, `${stamp}-${exchange.name}.json`);
  const body = redact(
    JSON.stringify(
      {
        ...exchange,
        note: "Secrets are redacted before this file is written.",
      },
      null,
      2,
    ),
  );
  await writeFile(filePath, `${body}\n`, "utf8");
  return filePath;
}

const SECRET_PATTERNS: RegExp[] = [
  /api-key\s*[:=]\s*\S+/gi,
  /authorization\s*[:=]\s*bearer\s+\S+/gi,
  /bearer\s+[a-z0-9._\-]{8,}/gi,
  /FORTYGUARD_API_KEY=\S+/g,
];

export function redact(value: string): string {
  const stripped = SECRET_PATTERNS.reduce(
    (text, pattern) => text.replace(pattern, "[redacted]"),
    value,
  );
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  if (key === undefined || key.length < 8) return stripped;
  return stripped.split(key).join("[redacted]");
}

export function logInfo(message: string, details?: unknown): void {
  const suffix = details === undefined ? "" : ` ${redact(safeJson(details))}`;
  console.log(`[fortyguard] ${redact(message)}${suffix}`);
}

export function logError(message: string, details?: unknown): void {
  const suffix = details === undefined ? "" : ` ${redact(safeJson(details))}`;
  console.error(`[fortyguard] ${redact(message)}${suffix}`);
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

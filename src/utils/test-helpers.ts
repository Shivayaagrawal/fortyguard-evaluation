export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set. Add it to .env. Do not print the value.`);
  }
  return value;
}

export function envFlag(name: string): boolean {
  return process.env[name]?.trim().toLowerCase() === "true";
}

export function readNumberEnv(name: string): number | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be a number.`);
  }
  return value;
}

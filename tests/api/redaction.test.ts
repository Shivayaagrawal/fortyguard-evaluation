import { describe, expect, it } from "vitest";
import { redact } from "../../src/utils/logger.js";

describe("secret redaction", () => {
  it("removes a raw key value even when the header name is absent", () => {
    const previous = process.env.FORTYGUARD_API_KEY;
    process.env.FORTYGUARD_API_KEY = "unit-test-key-value-0123456789";
    const output = redact("echo unit-test-key-value-0123456789");
    expect(output).not.toContain("unit-test-key-value-0123456789");
    if (previous === undefined) delete process.env.FORTYGUARD_API_KEY;
    else process.env.FORTYGUARD_API_KEY = previous;
  });

  it("removes API keys and bearer tokens from recorded text", () => {
    const input = [
      "api-key: fg_live_secret_value",
      "Authorization: Bearer fg_live_secret_value",
      "FORTYGUARD_API_KEY=fg_live_secret_value",
    ].join("\n");
    const output = redact(input);
    expect(output).not.toContain("fg_live_secret_value");
    expect(output).toContain("[redacted]");
  });
});

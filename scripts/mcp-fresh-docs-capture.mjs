import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const base = "https://docs-api.fortyguard.com";
const paths = [
  "/docs/mcp-overview",
  "/docs/mcp-quickstart",
  "/docs/mcp-authentication",
  "/docs/mcp-tools",
  "/docs/mcp-client-setup",
  "/docs/mcp-troubleshooting",
];
const out = "evidence/mcp-fresh/documentation";
await mkdir(out, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Users/shivanyaagrawal/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell",
});
const page = await browser.newPage();
const index = [];
for (const route of paths) {
  const started = Date.now();
  const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.locator("h1").first().waitFor({ timeout: 20000 }).catch(() => undefined);
  await page.waitForTimeout(1200);
  const h1 = await page.locator("h1").first().innerText().catch(() => "");
  const text = await page.locator("main").innerText().catch(async () => page.locator("body").innerText());
  const file = `${route.split("/").pop()}.md`;
  await writeFile(
    `${out}/${file}`,
    `# ${route}\n\nCaptured: ${new Date().toISOString()}\nHTTP ${response?.status() ?? 0}\nElapsed ms: ${Date.now() - started}\nH1: ${h1}\n\n${text}\n`,
  );
  index.push({ route, status: response?.status() ?? 0, h1, chars: text.length });
  console.log(`${response?.status() ?? 0} ${route} ${h1} ${text.length}`);
}
await writeFile(`${out}/index.json`, `${JSON.stringify(index, null, 2)}\n`);
await browser.close();

import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const base = "https://docs-api.fortyguard.com";
const paths = [
  "/docs/monitoring-create",
  "/docs/monitoring-list",
  "/docs/monitoring-get",
  "/docs/monitoring-update",
  "/docs/monitoring-delete",
  "/docs/monitoring-alerts",
  "/docs/monitoring-report",
];

const out = "evidence/api-fresh/documentation/pages";
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
  await page.waitForTimeout(1500);
  const h1 = await page.locator("h1").first().innerText().catch(() => "");
  const text = await page.locator("main").innerText().catch(async () => page.locator("body").innerText());
  const status = response?.status() ?? 0;
  const file = `${route.split("/").pop()}.md`;
  await writeFile(
    `${out}/${file}`,
    `# ${route}\n\nCaptured: ${new Date().toISOString()}\nHTTP ${status}\nElapsed ms: ${Date.now() - started}\nH1: ${h1}\n\n${text}\n`,
  );
  index.push({ route, status, h1, chars: text.length, ms: Date.now() - started, file });
  console.log(`${status} ${route} ${h1} ${text.length}`);
}

await page.goto(base + "/docs/introduction", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.locator("h1").first().waitFor({ timeout: 20000 }).catch(() => undefined);
for (const label of ["Monitors", "Alerts"]) {
  const button = page.getByRole("button", { name: label, exact: true });
  if (await button.count()) {
    await button.click();
    await page.waitForTimeout(400);
  }
}
const links = await page.locator("a").evaluateAll((anchors) =>
  anchors.map((anchor) => ({
    text: (anchor.innerText || "").replace(/\s+/g, " ").trim(),
    href: anchor.getAttribute("href"),
  })),
);
await writeFile(`${out}/sidebar-after-expand.json`, `${JSON.stringify(links, null, 2)}\n`);
await writeFile(`${out}/index-monitoring.json`, `${JSON.stringify(index, null, 2)}\n`);

await page.goto(base + "/docs/credits-usage", { waitUntil: "domcontentloaded", timeout: 45000 });
await page.locator("h1").first().waitFor({ timeout: 20000 }).catch(() => undefined);
await page.waitForTimeout(1500);
const creditsDom = await page.evaluate(() => {
  const html = document.body.innerHTML;
  const hits = html.match(/\/v1\/[a-z0-9_./{}$-]+/gi) ?? [];
  const forms = [...document.querySelectorAll("form")].map((form) => ({
    action: form.getAttribute("action"),
    method: form.getAttribute("method"),
  }));
  const inputs = [...document.querySelectorAll("input, button")].map((node) => ({
    tag: node.tagName,
    type: node.getAttribute("type"),
    name: node.getAttribute("name"),
    placeholder: node.getAttribute("placeholder"),
  }));
  return { hits: [...new Set(hits)].slice(0, 40), forms, inputs };
});
await writeFile(`${out}/credits-page-dom.json`, `${JSON.stringify(creditsDom, null, 2)}\n`);
await browser.close();

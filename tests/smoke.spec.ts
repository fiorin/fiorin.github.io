import { expect, test, type Page } from "@playwright/test";

// The site is prerendered and static: every page must be complete in the HTML
// that arrives, and hydration must adopt that markup instead of replacing it.
const routes = [
  { path: "/", title: "Fior.in — Software developer", marker: "I can code!" },
  { path: "/resume/", title: "Senior Software Engineer", marker: "Luciano Fiorin" },
  { path: "/games/", title: "Fiorin Games Studio", marker: "Roll for initiative!" },
  { path: "/404.html", title: "Page not found", marker: "not found" }
];

// Wire budget per route, measured from `vite preview` (which gzips like
// production does). Largest route today: ~20 KB script, ~257 KB total.
const JS_BUDGET_KB = 28;
const TOTAL_BUDGET_KB = 340;

type Audit = {
  status: number | undefined;
  consoleErrors: string[];
  failedRequests: string[];
  bytes: { script: number; stylesheet: number; image: number; font: number; document: number; other: number };
  adoptedNodes: number;
};

async function load(page: Page, path: string): Promise<Audit> {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  const bytes = { script: 0, stylesheet: 0, image: 0, font: 0, document: 0, other: 0 };
  const kinds = new Map<string, string>();

  // encodedDataLength is the real number of bytes on the wire, and it is
  // available even for chunked responses (which have no content-length).
  const client = await page.context().newCDPSession(page);
  await client.send("Network.enable");
  client.on("Network.responseReceived", ({ requestId, type }) => kinds.set(requestId, type));
  client.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    switch (kinds.get(requestId)) {
      case "Script": bytes.script += encodedDataLength; break;
      case "Stylesheet": bytes.stylesheet += encodedDataLength; break;
      case "Image": bytes.image += encodedDataLength; break;
      case "Font": bytes.font += encodedDataLength; break;
      case "Document": bytes.document += encodedDataLength; break;
      default: bytes.other += encodedDataLength;
    }
  });

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(String(error)));
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()} — ${request.failure()?.errorText}`));

  // Hydration must reuse the prerendered DOM. A full re-render would remove the
  // existing children, so count removals inside #root.
  await page.addInitScript(() => {
    const state = { removed: 0 };
    (window as unknown as { __rootRemovals: typeof state }).__rootRemovals = state;
    const watch = () => {
      const root = document.getElementById("root");
      if (!root) return window.requestAnimationFrame(watch);
      new MutationObserver((records) => {
        for (const record of records) state.removed += record.removedNodes.length;
      }).observe(root, { childList: true, subtree: true });
    };
    watch();
  });

  const response = await page.goto(path, { waitUntil: "load" });
  await page.waitForLoadState("networkidle");
  const adoptedNodes = await page.evaluate(() => (window as unknown as { __rootRemovals: { removed: number } }).__rootRemovals.removed);

  return { status: response?.status(), consoleErrors, failedRequests, bytes, adoptedNodes };
}

for (const route of routes) {
  test(`${route.path} prerenders and hydrates`, async ({ page }) => {
    const audit = await load(page, route.path);

    expect(audit.status, "status").toBe(200);
    expect(audit.consoleErrors, "console errors").toEqual([]);
    expect(audit.failedRequests, "failed requests").toEqual([]);

    // Prerendered HTML arrived complete: title, canonical and real content.
    await expect(page).toHaveTitle(new RegExp(route.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    await expect(page.locator("#root > *").first()).toBeVisible();
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("body")).toContainText(route.marker);

    // The prerender is in the served HTML, not injected by JavaScript.
    const html = await page.request.get(route.path).then((response) => response.text());
    expect(html).toContain('id="root"><div');

    expect(audit.adoptedNodes, "hydration replaced prerendered nodes").toBe(0);

    const jsKb = audit.bytes.script / 1024;
    const totalKb = (audit.bytes.script + audit.bytes.stylesheet + audit.bytes.image + audit.bytes.font + audit.bytes.document + audit.bytes.other) / 1024;
    test.info().annotations.push({
      type: "bytes",
      description: `script=${jsKb.toFixed(1)}KB css=${(audit.bytes.stylesheet / 1024).toFixed(1)}KB image=${(audit.bytes.image / 1024).toFixed(1)}KB font=${(audit.bytes.font / 1024).toFixed(1)}KB total=${totalKb.toFixed(1)}KB`
    });
    expect(jsKb, "javascript budget").toBeLessThan(JS_BUDGET_KB);
    expect(totalKb, "total budget").toBeLessThan(TOTAL_BUDGET_KB);
  });
}

test("agent entry points are reachable", async ({ request }) => {
  for (const path of ["/llms.txt", "/AGENTS.md", "/projects.json", "/games.json", "/resume.json", "/content/projects.schema.json"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
});

// Generates the link-preview (Open Graph) images in public/og/.
//
//   cd apps/web && node scripts/og/generate.mjs
//
// Renders an HTML card per image in headless Chromium at 1200x630 using the
// site's own fonts, colours and hero image. Needs Playwright with Chromium
// (`npm i -D playwright && npx playwright install chromium` if missing).
// Re-run after changing the copy below, then commit the images.

import { chromium } from "playwright";
import { mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = path.join(root, "public/og");
mkdirSync(outDir, { recursive: true });

const dataUri = (file, type) => `data:${type};base64,${readFileSync(path.join(root, file)).toString("base64")}`;
const manrope = dataUri("node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2", "font/woff2");
const manropeExt = dataUri("node_modules/@fontsource-variable/manrope/files/manrope-latin-ext-wght-normal.woff2", "font/woff2");
const inter = dataUri("node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", "font/woff2");
const interExt = dataUri("node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2", "font/woff2");
const hero = dataUri("public/images/home-splash.jpg", "image/jpeg");
const logo = dataUri("public/images/tectovault-logo.png", "image/png");

const images = [
  {
    file: "default-en.jpg",
    eyebrow: "AI Agents · Automation · Software",
    title: "AI agents that work for your business.",
    chat: ["Hi! Can I book a table for 4 tomorrow at 8pm?", "booking.create(4 guests, 20:00)", "Done! Your table is confirmed. See you then."],
    footer: "tectovault.com · Tirana, Albania",
  },
  {
    file: "default-sq.jpg",
    eyebrow: "Agjentë AI · Automatizim · Softuer",
    title: "Agjentë AI që punojnë për biznesin tuaj.",
    chat: ["Përshëndetje! Keni tavolinë për 4 nesër në 20:00?", "booking.create(4 persona, 20:00)", "U krye! Tavolina juaj është konfirmuar."],
    footer: "tectovault.com · Tiranë, Shqipëri",
  },
  {
    file: "ai-agents-en.jpg",
    eyebrow: "Voice · Chat · Operations agents",
    title: "An AI workforce that answers, books and gets work done.",
    chat: ["I need to move my appointment on Thursday.", "calendar.reschedule()", "Done! You're booked for Monday at 16:00."],
    footer: "From €390 setup + €49/month · tectovault.com",
  },
  {
    file: "ai-agents-sq.jpg",
    eyebrow: "Agjentë zanorë · chat · operacionalë",
    title: "Një fuqi punëtore AI që përgjigjet, rezervon dhe i kryen punët.",
    chat: ["Duhet ta zhvendos takimin e së enjtes.", "calendar.reschedule()", "U krye! Jeni të rezervuar të hënën në 16:00."],
    footer: "Nga €390 konfigurim + €49/muaj · tectovault.com",
  },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = (img) => `<!doctype html><html><head><style>
@font-face { font-family: Manrope; src: url(${manrope}) format("woff2"); font-weight: 200 800; }
@font-face { font-family: Manrope; src: url(${manropeExt}) format("woff2"); font-weight: 200 800; unicode-range: U+0100-024F; }
@font-face { font-family: Inter; src: url(${inter}) format("woff2"); font-weight: 100 900; }
@font-face { font-family: Inter; src: url(${interExt}) format("woff2"); font-weight: 100 900; unicode-range: U+0100-024F; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #08090c; color: #f4f4f6; font-family: Inter, sans-serif; position: relative; }
.bg { position: absolute; inset: 0; background: url(${hero}) right center / cover; opacity: .55; }
.shade { position: absolute; inset: 0; background: linear-gradient(90deg, #08090c 0%, rgba(8,9,12,.92) 45%, rgba(8,9,12,.35) 100%); }
.glow { position: absolute; right: 60px; top: 120px; width: 420px; height: 420px; border-radius: 50%; background: rgba(79,209,168,.22); filter: blur(70px); }
.grid { position: absolute; inset: 0; opacity: .1; background-image: linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px); background-size: 60px 60px; }
.left { position: absolute; left: 72px; top: 64px; bottom: 60px; width: 640px; display: flex; flex-direction: column; }
.logo { height: 34px; width: auto; align-self: flex-start; filter: brightness(1.6); }
.eyebrow { margin-top: auto; display: flex; align-items: center; gap: 12px; font-size: 19px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: #9a9ba3; }
.dot { width: 12px; height: 12px; border-radius: 50%; background: #4fd1a8; box-shadow: 0 0 18px 4px rgba(79,209,168,.6); }
h1 { margin-top: 22px; font-family: Manrope, sans-serif; font-weight: 600; font-size: ${img.title.length > 45 ? 56 : 66}px; line-height: 1.04; letter-spacing: -.03em; }
.footer { margin-top: 30px; font-size: 21px; color: #4fd1a8; font-weight: 500; }
.chat { position: absolute; right: 64px; top: 150px; width: 380px; border-radius: 26px; border: 1px solid rgba(255,255,255,.15); background: rgba(8,9,12,.78); padding: 22px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 30px 80px -20px rgba(79,209,168,.45); }
.head { display: flex; align-items: center; gap: 10px; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,.1); font-size: 15px; font-weight: 600; }
.av { width: 30px; height: 30px; border-radius: 50%; background: rgba(79,209,168,.18); border: 1px solid rgba(79,209,168,.5); }
.on { margin-left: auto; font-size: 12px; color: #4fd1a8; font-weight: 500; }
.b { font-size: 16px; line-height: 1.4; padding: 11px 14px; border-radius: 16px; max-width: 88%; }
.u { align-self: flex-end; background: rgba(255,255,255,.1); border-bottom-right-radius: 5px; }
.t { align-self: flex-start; font-family: ui-monospace, monospace; font-size: 13px; color: #4fd1a8; border: 1px solid rgba(79,209,168,.35); background: rgba(79,209,168,.1); border-radius: 999px; padding: 7px 12px; }
.a { align-self: flex-start; background: #4fd1a8; color: #06120e; border-bottom-left-radius: 5px; font-weight: 500; }
</style></head><body>
<div class="bg"></div><div class="shade"></div><div class="grid"></div><div class="glow"></div>
<div class="left">
  <img class="logo" src="${logo}" />
  <div class="eyebrow"><span class="dot"></span>${esc(img.eyebrow)}</div>
  <h1>${esc(img.title)}</h1>
  <div class="footer">${esc(img.footer)}</div>
</div>
<div class="chat">
  <div class="head"><span class="av"></span>TectoVault Agent<span class="on">● online</span></div>
  <div class="b u">${esc(img.chat[0])}</div>
  <div class="t">✓ ${esc(img.chat[1])}</div>
  <div class="b a">${esc(img.chat[2])}</div>
</div>
</body></html>`;

const browser = await chromium.launch();
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const img of images) {
  await tab.setContent(page(img), { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: path.join(outDir, img.file), type: "jpeg", quality: 86 });
  console.log("wrote public/og/" + img.file);
}
await browser.close();

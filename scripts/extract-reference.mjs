import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const url = "https://www.somehowliving.tech/";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(5000);

const manifest = await page.evaluate(() => ({
  title: document.title,
  viewport: { width: window.innerWidth, height: window.innerHeight },
  body: {
    className: document.body.className,
    text: document.body.innerText,
    children: [...document.body.children].map((element) => ({
      tag: element.tagName.toLowerCase(),
      className: element.className,
      id: element.id,
      text: element.textContent?.trim().slice(0, 1200) ?? "",
    })),
  },
  images: [...document.images].map((image) => ({
    src: image.currentSrc || image.src,
    alt: image.alt,
    width: image.naturalWidth,
    height: image.naturalHeight,
  })),
  svgs: [...document.querySelectorAll("svg")].map((svg) => ({
    viewBox: svg.getAttribute("viewBox"),
    text: svg.outerHTML,
  })),
  links: [...document.querySelectorAll("a")].map((anchor) => ({
    text: anchor.textContent?.trim() ?? "",
    href: anchor.href,
  })),
  buttons: [...document.querySelectorAll("button")].map((button) => button.textContent?.trim() ?? ""),
  stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.href),
  scripts: [...document.scripts].map((script) => script.src).filter(Boolean),
  libraries: {
    gsap: typeof window.gsap !== "undefined",
    scrollTrigger: typeof window.ScrollTrigger !== "undefined",
    framer: document.querySelector("[data-framer-appear], [data-projection-id]") !== null,
    lenis: typeof window.lenis !== "undefined" || document.documentElement.classList.contains("lenis"),
  },
}));

manifest.url = url;
manifest.assets = { images: manifest.images, videos: [], fonts: manifest.stylesheets };

await mkdir("docs", { recursive: true });
await writeFile("docs/site-manifest.json", `${JSON.stringify(manifest, null, 2)}\n`);
await browser.close();

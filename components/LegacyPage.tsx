import { readFileSync } from "node:fs";
import { join } from "node:path";
import LegacyScripts from "./LegacyScripts";

type LegacyScript = { code: string; type?: string };

function modernizeLinks(html: string) {
  return html
    .replaceAll('href="index.html"', 'href="/"')
    .replace(/href="(essays|books|notes|journal|people|aiva|svar)\.html"/g, 'href="/$1"')
    .replace(/href="blog\.html\?post=([^"&]+)"/g, 'href="/blog/$1"')
    .replaceAll('href="Ujjwal_Resume.pdf"', 'href="/Ujjwal_Resume.pdf"')
    .replaceAll('src="public/', 'src="/');
}

function parseLegacyPage(source: string) {
  const document = readFileSync(join(process.cwd(), `${source}.html`), "utf8");
  const body = document.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const styles = [...document.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]);
  let scripts: LegacyScript[] = [...body.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter((match) => !/\ssrc=/i.test(match[1]))
    .map((match) => ({
      code: match[2],
      type: /type=["']([^"']+)["']/i.exec(match[1])?.[1],
    }));
  let content = modernizeLinks(body.replace(/<script[\s\S]*?<\/script>/gi, ""));

  if (source === "notes" || source === "journal") {
    content = content
      .replace(/<!-- Password Protection Screen -->[\s\S]*?<!-- Main App Interface -->/i, "<!-- Access verified by Next.js -->")
      .replace('id="app-container" class="app-container"', 'id="app-container" class="app-container" style="display: flex"');

    scripts = scripts.map((script) => ({
      ...script,
      code:
        script.code
          .replace(/\s*\/\/ Password\s*\n\s*const CORRECT_PASSWORD = [^;]+;/, "")
          .replace(/\s*const CORRECT_PASSWORD = [^;]+;/, "")
          .replace(/\s*\/\/ Password check[\s\S]*?window\.checkPassword = function\(\) \{[\s\S]*?\n\s*\};/, "") +
        `\nqueueMicrotask(() => ${source === "notes" ? "loadNotebooks()" : "initJournal()"});`,
    }));
  }

  return { content, scripts, styles };
}

export default function LegacyPage({ source }: { source: string }) {
  const { content, scripts, styles } = parseLegacyPage(source);
  const isInteractiveTool = source === "notes" || source === "journal";

  return (
    <>
      {styles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {scripts.length > 0 && <LegacyScripts scripts={scripts} />}
    </>
  );
}

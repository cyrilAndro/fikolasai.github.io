const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pages = [];
const failures = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (entry.name === "index.html") pages.push(full);
  }
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();
}

function walk(value, callback) {
  if (!value || typeof value !== "object") return;
  callback(value);
  if (Array.isArray(value)) value.forEach((item) => walk(item, callback));
  else Object.values(value).forEach((item) => walk(item, callback));
}

collect(root);

for (const file of pages) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const html = fs.readFileSync(file, "utf8");
  const text = visibleText(html);
  const redirectPage = /<meta\b[^>]*http-equiv=["']refresh["']/i.test(html) && /noindex/i.test(html);
  const requiredMeta = [
    /<meta\b[^>]*property=["']og:title["']/i,
    /<meta\b[^>]*property=["']og:description["']/i,
    /<meta\b[^>]*property=["']og:image["']/i,
    /<meta\b[^>]*property=["']og:site_name["']/i,
    /<meta\b[^>]*name=["']twitter:card["']/i,
    /<meta\b[^>]*name=["']twitter:title["']/i,
    /<meta\b[^>]*name=["']twitter:description["']/i,
    /<link\b[^>]*llms\.txt/i,
  ];
  requiredMeta.forEach((pattern, index) => {
    if (redirectPage) return;
    if (!pattern.test(html)) failures.push(`${relative}: métadonnée GEO/sociale ${index + 1} absente`);
  });

  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed;
    try {
      parsed = JSON.parse(match[1]);
    } catch (error) {
      failures.push(`${relative}: JSON-LD invalide (${error.message})`);
      continue;
    }
    walk(parsed, (node) => {
      if (node["@type"] !== "FAQPage") return;
      for (const entity of node.mainEntity || []) {
        const question = String(entity.name || "").replace(/[’‘]/g, "'").toLocaleLowerCase();
        const answer = String(entity.acceptedAnswer?.text || "").replace(/[’‘]/g, "'").toLocaleLowerCase();
        if (question && !text.includes(question)) {
          failures.push(`${relative}: question FAQ schema non visible (${entity.name})`);
        }
        if (answer && !text.includes(answer)) {
          failures.push(`${relative}: réponse FAQ schema non visible (${entity.name})`);
        }
      }
    });
  }
}

for (const relative of [
  "methode-fikolasai-agent-ia/index.html",
  "mesurer-valeur-agent-ia/index.html",
  "exemples-agents-ia-metier/index.html",
  "agent-ia-vs-chatbot-automation/index.html",
  "chatgpt-entreprise-sans-chaos/index.html",
  "guide-premier-agent-ia-rentable/index.html",
]) {
  const html = fs.readFileSync(path.join(root, relative), "utf8");
  if (!html.includes('data-geo-depth="v2"')) failures.push(`${relative}: approfondissement GEO absent`);
  if (!html.includes('"dateModified":"2026-07-28"')) failures.push(`${relative}: dateModified absente`);
}

for (const relative of [
  "definition-agent-ia-metier/index.html",
  "faq-agent-ia/index.html",
  "glossaire-ia-business/index.html",
]) {
  const html = fs.readFileSync(path.join(root, relative), "utf8");
  if (
    !html.includes('data-geo-authority-links="v2"')
    && !html.includes('data-seo-authority-chain="2026-07-28"')
  ) failures.push(`${relative}: maillage d’autorité absent`);
}

for (const relative of ["llms.txt", "llms-full.txt", "ai.txt"]) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`${relative}: manifeste absent`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`GEO v2 checks passed on ${pages.length} pages.`);

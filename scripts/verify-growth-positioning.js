const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const failures = [];
const htmlFiles = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(fullPath);
    else if (entry.name === "index.html") htmlFiles.push(fullPath);
  }
}

function fail(file, message) {
  failures.push(`${path.relative(root, file)}: ${message}`);
}

collect(root);
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  if (/(?:1000\s?€|1[\s\u00a0]?000\s?€|€1,?000|\b7\s+jours\b|\b7\s+days\b|\b7-day\b)/i.test(html)) {
    fail(file, "ancienne promesse commerciale détectée");
  }
  if (/prêt la semaine prochaine|ready next week/i.test(html)) {
    fail(file, "délai commercial contradictoire détecté");
  }
  if (/Vérifier si mon projet d[’']Agent IA est adapté|Check whether my AI Agent project is a fit/i.test(html)) {
    fail(file, "ancien CTA Agent non aligné avec le formulaire");
  }
  if (/"price"\s*:\s*"1000"/.test(html)) fail(file, "ancien prix présent dans JSON-LD");
  if (/calendly\.com\/cyril-fikolasai\/rdv-cyril-fikolasai-agent/i.test(html)) {
    fail(file, "ancien parcours Calendly direct détecté");
  }
  for (const match of html.matchAll(/href="https:\/\/tally\.so\/r\/2EbyZL([^"]*)"/gi)) {
    if (!/utm_source=fikolasai/.test(match[1]) || !/utm_medium=website/.test(match[1])) {
      fail(file, "CTA Tally sans attribution complète");
    }
    if (!/utm_campaign=(?:agent_ia|formation_ia|accompagnement_ia|innovation_ia)/.test(match[1])) {
      fail(file, "CTA Tally sans parcours commercial reconnu");
    }
  }
  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      fail(file, `JSON-LD invalide (${error.message})`);
    }
  }
}

for (const homepage of ["index.html", path.join("en", "index.html")]) {
  const file = path.join(root, homepage);
  const html = fs.readFileSync(file, "utf8");
  for (const campaign of ["agent_ia"]) {
    if (!html.includes(`utm_campaign=${campaign}`)) fail(file, `parcours ${campaign} absent`);
  }
}

if (htmlFiles.length !== 87) failures.push(`Nombre de pages inattendu : ${htmlFiles.length} au lieu de 87`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Growth checks passed on ${htmlFiles.length} pages.`);

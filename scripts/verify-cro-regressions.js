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

function report(file, message) {
  failures.push(`${path.relative(root, file).replaceAll("\\", "/")}: ${message}`);
}

function localTarget(file, href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || /^(?:https?:|mailto:|tel:|javascript:)/i.test(clean)) return null;
  if (clean.startsWith("/")) return path.join(root, clean, clean.endsWith("/") ? "index.html" : "");
  return path.resolve(path.dirname(file), clean, clean.endsWith("/") ? "index.html" : "");
}

collect(root);

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  const english = path.relative(root, file).replaceAll("\\", "/").startsWith("en/");

  const banned = [
    [/prêt la semaine prochaine|ready next week/i, "ancien délai"],
    [/Vérifier si mon projet d[’']Agent IA est adapté|Check whether my AI Agent project is a fit/i, "ancien CTA Agent"],
    [/(?:prix fixe de|fixed price of)\s*(?:4[\s\u00a0]?990|€4,?990)/i, "prix présenté comme fixe"],
    [/(?:500\s*€\s*HT\/mois|€500\s*(?:excl\. VAT)?\/month)/i, "tarif de maintenance non validé"],
    [/(?:500€\s*HT|€500\s*excl\. VAT)/i, "tarif récurrent non validé"],
    [/(?:1 mois|30 jours|1 month|30 days).{0,35}(?:inclus|included|support|suivi|ajustement)/i, "support post-livraison présenté comme automatique"],
    [/(?:Réponse personnalisée sous 2 jours ouvrés|(?<!a )Personal reply within 2 business days)/i, "délai de réponse présenté comme ferme"],
    [/(?:prix fixe|fixed price)/i, "prix présenté comme contractuellement fixe"],
    [/(?:livré sous 15 jours ouvrés|delivered within 15 business days)/i, "délai de livraison présenté comme ferme"],
    [/\b(?:garantie RGPD|RGPD garanti|GDPR guaranteed|certifié RGPD)\b/i, "garantie juridique non défendable"],
    [/\b(?:nous garantissons un résultat commercial|we guarantee a commercial outcome)\b/i, "garantie de résultat"],
    [/(?:1000\s?€|1[\s\u00a0]?000\s?€|€1,?000|\b7\s+jours\b|\b7\s+days\b|\b7-day\b)/i, "ancienne offre"]
  ];
  for (const [pattern, label] of banned) if (pattern.test(html)) report(file, label);

  if (!/<link rel="canonical" href="https:\/\/fikolasai\.com\//i.test(html)) report(file, "canonical absent");
  if (/hreflang=/i.test(html) && !/hreflang="x-default"/i.test(html)) report(file, "groupe hreflang sans x-default");

  for (const match of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      report(file, `JSON-LD invalide (${error.message})`);
    }
  }

  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.has(match[1])) report(file, `ancre introuvable #${match[1]}`);
  }

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    const target = localTarget(file, href);
    if (target && !fs.existsSync(target)) report(file, `lien local introuvable ${href}`);
  }

  for (const match of html.matchAll(/href="https:\/\/tally\.so\/r\/2EbyZL([^"]*)"/gi)) {
    if (!/utm_source=fikolasai/.test(match[1]) || !/utm_medium=website/.test(match[1])) report(file, "CTA Tally sans attribution");
    if (!/utm_campaign=(?:agent_ia|formation_ia|accompagnement_ia|innovation_ia)/.test(match[1])) report(file, "campagne Tally inconnue");
  }

  if (english && /(?:Vos données|À partir de|jours ouvrés|Aucun engagement)/.test(html)) {
    report(file, "fragment commercial français sur une page anglaise");
  }
}

for (const [relative, language] of [["index.html", "fr"], ["en/index.html", "en"]]) {
  const file = path.join(root, relative);
  const html = fs.readFileSync(file, "utf8");
  const required = language === "fr"
    ? ["À partir de 4 990 € HT", "Décrire mon projet d’Agent IA", "Réponse généralement sous 2 jours ouvrés. La demande initiale ne vous engage pas à commander.", 'id="adequation"', 'id="fonctionnement"', 'id="livrables"', 'id="donnees"', 'id="couts"']
    : ["starting at €4,990 excluding VAT", "Describe my AI Agent project", "We generally reply within 2 business days. Submitting the initial request does not commit you to purchase.", 'id="fit"', 'id="process"', 'id="livrables"', 'id="data"', 'id="costs"'];
  for (const text of required) if (!html.toLocaleLowerCase().includes(text.toLocaleLowerCase())) report(file, `contenu CRO requis absent : ${text}`);
  const faqCards = (html.match(/<section id="faq"[\s\S]*?<\/section>/)?.[0].match(/<article/g) || []).length;
  if (faqCards !== 15) report(file, `FAQ : ${faqCards} questions au lieu de 15`);
  if (/id="(?:parcours|journeys)"/.test(html)) report(file, "ancienne grille d’offres encore visible");
}

if (pages.length !== 87) failures.push(`Nombre de pages inattendu : ${pages.length} au lieu de 87`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`CRO regression checks passed on ${pages.length} pages.`);

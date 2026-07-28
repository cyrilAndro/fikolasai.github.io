const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const editorialDate = "2026-07-28";

const intentPages = {
  "ressources-ia/index.html": {
    title: "Centre de ressources IA pour PME | FikolasAI",
    description: "Centre de ressources FikolasAI : offres, méthodes, cas d’usage, réponses et parcours thématiques pour choisir un projet IA adapté à votre PME.",
    h1: "Le centre de ressources FikolasAI.",
    label: "Intention de cette page",
    text: "Cette page est le répertoire général du site. Elle oriente vers les offres, les méthodes, les cas d’usage et les contenus de référence selon votre besoin.",
    link: '<a class="text-gold font-semibold hover:underline" href="/ressources-ia-dirigeants/">Vous cherchez uniquement des guides de décision pour dirigeants ? Consultez la sélection dédiée.</a>',
  },
  "ressources-ia-dirigeants/index.html": {
    title: "Guides IA pour dirigeants de PME | FikolasAI",
    description: "Guides de décision pour dirigeants de PME : sélectionner un usage IA, comparer les approches, encadrer les risques et mesurer la valeur.",
    h1: "Guides IA pour décider en tant que dirigeant.",
    label: "Sélection éditoriale",
    text: "Cette sélection s’adresse aux dirigeants qui veulent comprendre, arbitrer et encadrer un projet IA. Elle ne remplace pas le répertoire complet des offres et ressources.",
    link: '<a class="text-gold font-semibold hover:underline" href="/ressources-ia/">Accéder au centre de ressources complet.</a>',
  },
  "chatgpt-pour-entreprise/index.html": {
    title: "ChatGPT en entreprise : usages et limites | FikolasAI",
    description: "Comprendre ChatGPT en entreprise : usages utiles, limites, confidentialité, validation humaine et critères pour choisir les premiers cas d’usage.",
    h1: "ChatGPT en entreprise : usages, limites et premiers cas.",
    label: "Guide de compréhension",
    text: "Cette page explique ce que ChatGPT peut apporter, ses limites et les cas d’usage à sélectionner. Elle répond à une intention de découverte et d’évaluation.",
    link: '<a class="text-gold font-semibold hover:underline" href="/chatgpt-entreprise-sans-chaos/">Pour organiser un déploiement collectif, consultez le cadre de gouvernance et d’adoption.</a>',
  },
  "chatgpt-entreprise-sans-chaos/index.html": {
    title: "Gouvernance ChatGPT en entreprise | FikolasAI",
    description: "Cadre de gouvernance ChatGPT : règles d’usage, données interdites, validation humaine, responsables, pilote et adoption progressive en entreprise.",
    h1: "Gouvernance ChatGPT : déployer sans créer de chaos.",
    label: "Guide de déploiement",
    text: "Cette page traite de gouvernance, de règles internes et d’adoption collective après la décision d’utiliser ChatGPT. Elle répond à une intention de mise en œuvre.",
    link: '<a class="text-gold font-semibold hover:underline" href="/chatgpt-pour-entreprise/">Pour commencer par les usages et les limites de ChatGPT, consultez le guide d’introduction.</a>',
  },
};

const authorityChain = {
  "definition-agent-ia-metier/index.html": ["/glossaire-ia-business/", "Étape suivante : comprendre le vocabulaire IA business"],
  "glossaire-ia-business/index.html": ["/faq-agent-ia/", "Étape suivante : obtenir les réponses sur prix, délai, données et supervision"],
  "faq-agent-ia/index.html": ["/methode-fikolasai-agent-ia/", "Étape suivante : découvrir la méthode de cadrage et de réalisation"],
  "methode-fikolasai-agent-ia/index.html": ["/exemples-agents-ia-metier/", "Étape suivante : explorer des exemples d’Agents IA métier"],
  "exemples-agents-ia-metier/index.html": ["/guide-premier-agent-ia-rentable/", "Étape suivante : choisir un premier cas d’usage mesurable"],
};

const datedPages = new Set([
  "agent-ia-vs-chatbot-automation/index.html",
  "chatgpt-entreprise-sans-chaos/index.html",
  "chatgpt-pour-entreprise/index.html",
  "creer-agent-ia-pme/index.html",
  "definition-agent-ia-metier/index.html",
  "exemples-agents-ia-metier/index.html",
  "faq-agent-ia/index.html",
  "glossaire-ia-business/index.html",
  "guide-premier-agent-ia-rentable/index.html",
  "guides-ia/index.html",
  "mesurer-valeur-agent-ia/index.html",
  "methode-fikolasai-agent-ia/index.html",
  "reponses-ia-entreprise/index.html",
  "ressources-ia-dirigeants/index.html",
  "ressources-ia/index.html",
  "securite-donnees-agent-ia/index.html",
]);

function walkJson(value, visit) {
  if (Array.isArray(value)) return value.forEach((item) => walkJson(item, visit));
  if (!value || typeof value !== "object") return;
  visit(value);
  Object.values(value).forEach((item) => walkJson(item, visit));
}

function updateJsonLd(html, shouldDate) {
  return html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi, (whole, raw) => {
    try {
      const data = JSON.parse(raw);
      let changed = false;
      if (shouldDate) {
        walkJson(data, (node) => {
          if (["Article", "WebPage", "FAQPage"].includes(node["@type"])) {
            if (node.dateModified !== editorialDate) {
              node.dateModified = editorialDate;
              changed = true;
            }
          }
        });
      }
      return changed ? `<script type="application/ld+json">${JSON.stringify(data)}</script>` : whole;
    } catch {
      return whole;
    }
  });
}

function metaDescription(html, description) {
  return html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${description}">`);
}

let changed = 0;
for (const relative of new Set([...Object.keys(intentPages), ...Object.keys(authorityChain), ...datedPages])) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  const intent = intentPages[relative];

  if (intent) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${intent.title}</title>`);
    html = metaDescription(html, intent.description);
    html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${intent.h1}</h1>`);
    html = html.replace(/<section data-seo-intent="2026-07-28"[\s\S]*?<\/section>/i, "");
    const block = `<section data-seo-intent="2026-07-28" class="max-w-5xl mx-auto px-5 py-8 border-y border-line"><p class="text-gold font-semibold mb-2">${intent.label}</p><p class="text-slate-300 mb-3">${intent.text}</p>${intent.link}</section>`;
    html = html.replace("</main>", `${block}</main>`);
  }

  if (authorityChain[relative]) {
    html = html.replace(/<section data-geo-authority-links="v2"[\s\S]*?<\/section>/i, "");
    html = html.replace(/<section data-seo-authority-chain="2026-07-28"[\s\S]*?<\/section>/i, "");
    const [href, label] = authorityChain[relative];
    const block = `<section data-seo-authority-chain="2026-07-28" class="max-w-5xl mx-auto px-5 py-10 border-t border-line"><a class="card block p-6 hover:bg-white/10" href="${href}"><span class="text-gold font-semibold">${label} →</span></a></section>`;
    html = html.replace("</main>", `${block}</main>`);
  }

  html = updateJsonLd(html, datedPages.has(relative));
  if (datedPages.has(relative) && !html.includes('data-editorial-date="2026-07-28"')) {
    html = html.replace("</main>", `<p data-editorial-date="2026-07-28" class="max-w-5xl mx-auto px-5 pb-10 text-sm text-slate-500">Dernière mise à jour éditoriale : 28 juillet 2026.</p></main>`);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    changed += 1;
  }
}

let sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const relative of datedPages) {
  const pathname = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
  const escaped = pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(
    new RegExp(`(<loc>https://fikolasai\\.com${escaped}</loc>\\s*<lastmod>)[^<]+(</lastmod>)`),
    `$1${editorialDate}$2`
  );
}
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap, "utf8");

console.log(JSON.stringify({ pagesChanged: changed, datedPages: datedPages.size, authoritySteps: Object.keys(authorityChain).length }, null, 2));

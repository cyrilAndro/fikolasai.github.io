const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const site = "https://fikolasai.com";
const modified = "2026-07-28";
const htmlFiles = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (entry.name === "index.html") htmlFiles.push(full);
  }
}

function decodeEntities(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function textOnly(value) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function metaContent(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) =>
    new RegExp(`${key}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(item),
  );
  if (!tag) return "";
  const match = tag.match(/content=(?:"([^"]*)"|'([^']*)')/i);
  return match?.[1] || match?.[2] || "";
}

function canonical(html) {
  return html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    || html.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    || "";
}

function title(html) {
  return textOnly(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function ensureMeta(html, selector, content) {
  const [attribute, value] = selector;
  if (new RegExp(`<meta\\b[^>]*${attribute}=["']${value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(html)) {
    return html;
  }
  return html.replace("</head>", `<meta ${attribute}="${value}" content="${content.replaceAll('"', "&quot;")}"></head>`);
}

function replaceMetaDescription(html, description) {
  return html.replace(
    /<meta\b[^>]*name=["']description["'][^>]*>/i,
    `<meta name="description" content="${description}">`,
  );
}

function extractVisibleFaq(html) {
  const section = html.match(/<section\b[^>]*id=["']faq["'][^>]*>([\s\S]*?)<\/section>/i)?.[1];
  if (!section) return [];
  const entities = [];
  for (const article of section.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/gi)) {
    const block = article[1];
    const question = textOnly(block.match(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/i)?.[1] || "");
    const answer = textOnly(block.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "");
    if (question && answer) {
      entities.push({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      });
    }
  }
  return entities;
}

function walkJson(value, callback) {
  if (!value || typeof value !== "object") return;
  callback(value);
  if (Array.isArray(value)) value.forEach((item) => walkJson(item, callback));
  else Object.values(value).forEach((item) => walkJson(item, callback));
}

function syncFaqSchema(html, visibleFaq) {
  if (!visibleFaq.length) return html;
  return html.replace(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    (whole, raw) => {
      try {
        const data = JSON.parse(raw);
        let changed = false;
        walkJson(data, (node) => {
          if (node["@type"] === "FAQPage") {
            node.mainEntity = visibleFaq;
            changed = true;
          }
        });
        return changed
          ? `<script type="application/ld+json">${JSON.stringify(data)}</script>`
          : whole;
      } catch {
        return whole;
      }
    },
  );
}

function schemaFaqEntities(html) {
  const entities = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(match[1]);
      walkJson(data, (node) => {
        if (node["@type"] === "FAQPage" && Array.isArray(node.mainEntity)) {
          entities.push(...node.mainEntity);
        }
      });
    } catch {
      // Invalid JSON-LD is reported by the verification script.
    }
  }
  return entities;
}

function faqSectionFromSchema(entities, english) {
  if (!entities.length) return "";
  const heading = english ? "Frequently asked questions" : "Questions fréquentes";
  const eyebrow = english ? "Clear answers" : "Réponses claires";
  const cards = entities
    .filter((entity) => entity?.name && entity?.acceptedAnswer?.text)
    .map((entity) =>
      `<article class="card p-6"><h3 class="text-xl font-semibold mb-3">${entity.name}</h3><p class="text-slate-300 leading-relaxed">${entity.acceptedAnswer.text}</p></article>`,
    )
    .join("");
  return `<section id="faq" data-geo-visible-faq="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><div class="max-w-3xl mb-8"><p class="text-gold font-semibold mb-3">${eyebrow}</p><h2 class="text-3xl md:text-5xl font-semibold">${heading}</h2></div><div class="grid md:grid-cols-2 gap-4">${cards}</div></section>`;
}

function addDateModified(html) {
  return html.replace(
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    (whole, raw) => {
      try {
        const data = JSON.parse(raw);
        const nodes = data["@graph"] || [data];
        let changed = false;
        for (const node of nodes) {
          if (["WebPage", "Article", "BlogPosting"].includes(node["@type"])) {
            node.dateModified = modified;
            changed = true;
          }
        }
        return changed
          ? `<script type="application/ld+json">${JSON.stringify(data)}</script>`
          : whole;
      } catch {
        return whole;
      }
    },
  );
}

const descriptionOverrides = {
  "index.html": "Agent IA métier sur mesure pour PME et dirigeants : cadrage, conception, tests et documentation, à partir de 4 990 € HT.",
  "ressources-ia/index.html": "Ressources FikolasAI sur les Agents IA métier, la formation ChatGPT, les cas d’usage PME, les guides pratiques et les contenus de Cyril Cieslak.",
  "agent-ia-productivite/index.html": "Agent IA de productivité pour structurer une tâche répétitive, avec cadrage, tests, documentation et objectif de livraison sous 15 jours ouvrés.",
  "faq-agent-ia/index.html": "FAQ FikolasAI sur le prix, le délai cible, les livrables, les données, la supervision, les coûts tiers et le fonctionnement d’un Agent IA métier.",
  "creer-agent-ia-pme/index.html": "Méthode pour créer un Agent IA en PME : choisir une tâche rentable, cadrer les données, tester les sorties et organiser la supervision humaine.",
  "diagnostic-agent-ia/index.html": "Diagnostic local en deux minutes pour évaluer si une tâche est adaptée à un Agent IA et estimer son volume, sans envoyer vos réponses.",
  "confidentialite/index.html": "Politique de confidentialité de FikolasAI : mesure d’audience, consentement, services utilisés et moyens de contact relatifs aux données.",
  "en/solutions-ai-industries/index.html": "Explore practical business AI Agent use cases for sales, HR, consulting, law firms, SMB leaders and professional networks.",
};

const titleOverrides = {
  "creer-agent-ia-pme/index.html": "Créer un Agent IA pour une PME | Méthode FikolasAI",
  "en/index.html": "Business AI Agents: target 15 days | FikolasAI",
};

const pillarDepth = {
  "methode-fikolasai-agent-ia/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Réponse courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-5">La méthode FikolasAI transforme une tâche précise en système testable.</h2>
  <p class="text-xl text-slate-300 leading-relaxed mb-8">Elle suit six décisions : choisir la tâche, définir la sortie attendue, limiter les données, préciser la supervision, tester des cas représentatifs puis documenter l’usage et les limites.</p>
  <div class="grid md:grid-cols-3 gap-4">
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Entrées maîtrisées</h3><p class="text-slate-300">Les documents, champs, droits d’accès et informations interdites sont identifiés avant toute connexion.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Sortie vérifiable</h3><p class="text-slate-300">Le résultat attendu est décrit avec des exemples acceptables, des erreurs à détecter et un responsable de validation.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Passage en usage</h3><p class="text-slate-300">La documentation précise quand utiliser l’agent, quand l’arrêter et comment signaler une sortie incorrecte.</p></article>
  </div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Ce que la méthode ne promet pas</h2>
  <p class="text-slate-300">Elle ne garantit ni résultat commercial, ni autonomie totale, ni conformité générale. La valeur dépend du processus initial, des données disponibles, de l’adoption et du contrôle humain.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
  "mesurer-valeur-agent-ia/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Réponse courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-5">La valeur d’un Agent IA se mesure avant et après sur la même tâche.</h2>
  <p class="text-xl text-slate-300 leading-relaxed">Mesurez d’abord le temps, les étapes manuelles, les corrections, les délais et le taux de sorties réellement utilisables. Comparez ensuite ces mêmes indicateurs pendant une période représentative.</p>
  <div class="grid md:grid-cols-2 gap-4 mt-8">
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Mesures opérationnelles</h3><ul class="space-y-2 text-slate-300"><li>Temps moyen par dossier</li><li>Nombre de reprises manuelles</li><li>Taux de sorties validées</li><li>Délai entre l’entrée et la réponse</li></ul></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Mesures d’adoption</h3><ul class="space-y-2 text-slate-300"><li>Fréquence d’utilisation</li><li>Utilisateurs actifs</li><li>Exceptions remontées</li><li>Satisfaction des personnes concernées</li></ul></article>
  </div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Calcul prudent</h2>
  <p class="text-slate-300">Une estimation de valeur peut rapprocher le temps potentiellement évité du coût complet de la tâche et des coûts logiciels. Elle reste une hypothèse tant qu’elle n’a pas été observée en conditions réelles.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
  "exemples-agents-ia-metier/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Réponse courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-5">Un bon Agent IA métier prépare un livrable précis sans confisquer la décision.</h2>
  <div class="grid md:grid-cols-3 gap-4">
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Ventes B2B</h3><p class="text-slate-300">Entrées : formulaire, notes et critères. Sortie : synthèse de qualification et questions manquantes. Validation : commercial responsable.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Ressources humaines</h3><p class="text-slate-300">Entrées : documents autorisés et grille interne. Sortie : synthèse structurée. Validation : équipe RH, sans décision automatisée.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Cabinet de conseil</h3><p class="text-slate-300">Entrées : notes et modèle de livrable. Sortie : premier brouillon sourcé. Validation : consultant avant remise.</p></article>
  </div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Comment choisir entre ces exemples</h2>
  <p class="text-slate-300">Le meilleur premier cas est fréquent, suffisamment stable, alimenté par des données identifiables et assorti d’une sortie qu’une personne sait contrôler. Ces exemples sont démonstratifs et ne constituent pas des résultats clients.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
  "agent-ia-vs-chatbot-automation/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Comparaison courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-6">Chatbot, automatisation et Agent IA répondent à trois besoins différents.</h2>
  <div class="overflow-x-auto"><table class="w-full text-left"><thead><tr class="border-b border-line"><th class="p-4">Solution</th><th class="p-4">Usage principal</th><th class="p-4">Contrôle</th></tr></thead><tbody class="text-slate-300"><tr class="border-b border-line"><td class="p-4 font-semibold">Chatbot</td><td class="p-4">Répondre dans une conversation</td><td class="p-4">Sources et règles de réponse</td></tr><tr class="border-b border-line"><td class="p-4 font-semibold">Automatisation</td><td class="p-4">Exécuter une suite de règles stables</td><td class="p-4">Conditions déterministes et journalisation</td></tr><tr><td class="p-4 font-semibold">Agent IA métier</td><td class="p-4">Interpréter des entrées et préparer un livrable</td><td class="p-4">Tests, seuils et validation humaine</td></tr></tbody></table></div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Approche hybride</h2>
  <p class="text-slate-300">Un système peut combiner les trois : une interface conversationnelle collecte la demande, une automatisation déplace les données et un Agent IA prépare une synthèse. Le choix dépend de la variabilité des entrées et du risque associé à la sortie.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
  "chatgpt-entreprise-sans-chaos/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Réponse courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-5">Déployer ChatGPT sans chaos exige des règles d’usage avant des prompts.</h2>
  <p class="text-xl text-slate-300 leading-relaxed">L’entreprise doit définir les outils autorisés, les données interdites, les usages prioritaires, la vérification attendue et la personne responsable de chaque processus.</p>
  <div class="grid md:grid-cols-3 gap-4 mt-8">
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Autoriser</h3><p class="text-slate-300">Lister les comptes, fonctionnalités et types de documents utilisables.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Vérifier</h3><p class="text-slate-300">Exiger une relecture adaptée lorsque la réponse influence un client, un salarié ou une décision.</p></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Apprendre</h3><p class="text-slate-300">Documenter les erreurs fréquentes, les bons exemples et les cas qui doivent rester entièrement humains.</p></article>
  </div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Premier périmètre recommandé</h2>
  <p class="text-slate-300">Commencez par une équipe, deux ou trois usages non sensibles et une période d’observation. Étendez seulement après avoir mesuré la qualité et l’adoption.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
  "guide-premier-agent-ia-rentable/index.html": `
<section data-geo-depth="v2" class="max-w-6xl mx-auto px-5 py-14 border-t border-line">
  <p class="text-gold font-semibold mb-3">Réponse courte</p>
  <h2 class="text-3xl md:text-4xl font-semibold mb-5">Le premier Agent IA rentable cible une friction fréquente, mesurable et réversible.</h2>
  <p class="text-xl text-slate-300 leading-relaxed">Une tâche est prioritaire lorsqu’elle revient souvent, consomme un temps identifiable, suit des règles relativement stables et produit une sortie que l’équipe sait valider.</p>
  <div class="grid md:grid-cols-2 gap-4 mt-8">
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Bon premier cas</h3><ul class="space-y-2 text-slate-300"><li>Volume mensuel connu</li><li>Données accessibles et autorisées</li><li>Résultat attendu observable</li><li>Responsable métier disponible</li></ul></article>
    <article class="card p-6"><h3 class="text-xl font-semibold mb-3">Cas à différer</h3><ul class="space-y-2 text-slate-300"><li>Décision sensible entièrement autonome</li><li>Processus qui change chaque semaine</li><li>Données non accessibles</li><li>Aucun indicateur de réussite</li></ul></article>
  </div>
  <h2 class="text-2xl font-semibold mt-10 mb-4">Formule de priorisation</h2>
  <p class="text-slate-300">Comparez fréquence × temps par occurrence × potentiel d’amélioration, puis retranchez les coûts d’outils, de contrôle et de maintenance. Cette formule aide à classer les idées ; elle ne garantit pas une économie future.</p>
  <p class="mt-6 text-sm text-slate-500">Mise à jour éditoriale : 28 juillet 2026.</p>
</section>`,
};

const authorityLinks = `
<section data-geo-authority-links="v2" class="max-w-6xl mx-auto px-5 py-12 border-t border-line">
  <h2 class="text-2xl font-semibold mb-5">Continuer avec les sources de référence</h2>
  <div class="grid md:grid-cols-3 gap-4">
    <a class="card p-5 hover:bg-white/10" href="/definition-agent-ia-metier/"><strong>Définition Agent IA métier</strong><span class="block mt-2 text-sm text-slate-400">Périmètre, exemples et limites.</span></a>
    <a class="card p-5 hover:bg-white/10" href="/glossaire-ia-business/"><strong>Glossaire IA business</strong><span class="block mt-2 text-sm text-slate-400">Vocabulaire utile pour décider.</span></a>
    <a class="card p-5 hover:bg-white/10" href="/faq-agent-ia/"><strong>FAQ Agent IA</strong><span class="block mt-2 text-sm text-slate-400">Prix, délai, données et supervision.</span></a>
  </div>
</section>`;

const answerHubSources = `
<section data-geo-sources="v2" class="max-w-6xl mx-auto px-5 py-12 border-t border-line">
  <div class="max-w-3xl">
    <p class="text-gold font-semibold mb-3">Sources primaires</p>
    <h2 class="text-3xl md:text-4xl font-semibold mb-4">Comprendre comment les moteurs et assistants utilisent le Web</h2>
    <p class="text-slate-300 mb-6">Ces ressources officielles complètent les réponses FikolasAI sur l’indexation, les données structurées et l’accès des assistants IA aux contenus publics.</p>
    <ul class="space-y-3 text-slate-300">
      <li><a class="text-gold hover:underline" href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" rel="noopener noreferrer">Google Search Central — optimisation pour les fonctionnalités d’IA</a></li>
      <li><a class="text-gold hover:underline" href="https://help.openai.com/en/articles/12627856-publishers-and-developers-faq" rel="noopener noreferrer">OpenAI — FAQ pour les éditeurs et développeurs</a></li>
      <li><a class="text-gold hover:underline" href="https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c" rel="noopener noreferrer">Bing Webmaster Tools — AI Performance</a></li>
      <li><a class="text-gold hover:underline" href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers" rel="noopener noreferrer">Perplexity — documentation des robots d’exploration</a></li>
    </ul>
  </div>
</section>`;

collect(root);
let faqPagesUpdated = 0;
let metadataPagesUpdated = 0;

for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  let html = fs.readFileSync(file, "utf8");
  const before = html;

  if (relative === "reponses-ia-entreprise/index.html") {
    html = html.replace(/<section id="faq" data-geo-visible-faq="v2"[\s\S]*?<\/section>/i, "");
  }
  if (relative === "en/solutions-ai-industries/index.html") {
    html = html.replaceAll(
      "FikolasAI scopes a limited first use case and can deliver an operational first version in seven days.",
      "FikolasAI scopes a limited first use case with an objective of delivering an operational first version within 15 business days after scope validation."
    );
  }

  if (descriptionOverrides[relative]) {
    html = replaceMetaDescription(html, descriptionOverrides[relative]);
  }
  if (titleOverrides[relative]) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${titleOverrides[relative]}</title>`);
  }

  const pageTitle = title(html);
  const description = metaContent(html, "name", "description");
  const pageUrl = canonical(html);
  const image = `${site}/assets/photo-cyril.png`;

  if (pageTitle && description && pageUrl) {
    html = ensureMeta(html, ["property", "og:title"], pageTitle);
    html = ensureMeta(html, ["property", "og:description"], description);
    html = ensureMeta(html, ["property", "og:type"], "website");
    html = ensureMeta(html, ["property", "og:url"], pageUrl);
    html = ensureMeta(html, ["property", "og:image"], image);
    html = ensureMeta(html, ["property", "og:site_name"], "FikolasAI");
    html = ensureMeta(html, ["name", "twitter:card"], "summary_large_image");
    html = ensureMeta(html, ["name", "twitter:title"], pageTitle);
    html = ensureMeta(html, ["name", "twitter:description"], description);
    html = ensureMeta(html, ["name", "twitter:image"], image);
  }

  const visibleFaq = extractVisibleFaq(html);
  const faqSynced = syncFaqSchema(html, visibleFaq);
  if (faqSynced !== html) faqPagesUpdated += 1;
  html = faqSynced;

  if (
    relative !== "reponses-ia-entreprise/index.html"
    && !visibleFaq.length
    && !html.includes('data-geo-visible-faq="v2"')
  ) {
    const schemaFaq = schemaFaqEntities(html);
    if (schemaFaq.length) {
      const english = relative.startsWith("en/");
      html = html.replace("</main>", `${faqSectionFromSchema(schemaFaq, english)}</main>`);
    }
  }

  if (pillarDepth[relative] && !html.includes('data-geo-depth="v2"')) {
    html = html.replace("</main>", `${pillarDepth[relative]}</main>`);
    html = addDateModified(html);
  }

  if (
    ["definition-agent-ia-metier/index.html", "faq-agent-ia/index.html", "glossaire-ia-business/index.html"].includes(relative)
    && !html.includes('data-geo-authority-links="v2"')
  ) {
    html = html.replace("</main>", `${authorityLinks}</main>`);
  }

  if (
    relative === "reponses-ia-entreprise/index.html"
    && !html.includes('data-geo-sources="v2"')
  ) {
    html = html.replace("</main>", `${answerHubSources}</main>`);
  }

  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    metadataPagesUpdated += 1;
  }
}

console.log(JSON.stringify({
  pagesScanned: htmlFiles.length,
  pagesChanged: metadataPagesUpdated,
  faqSchemasSynchronized: faqPagesUpdated,
  pillarsStrengthened: Object.keys(pillarDepth).length,
}, null, 2));

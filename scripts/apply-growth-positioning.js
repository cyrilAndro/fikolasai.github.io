const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tallyBase = "https://tally.so/r/2EbyZL";

const routes = {
  agent: {
    campaign: "agent_ia",
    frLabel: "Décrire mon projet d’Agent IA",
    enLabel: "Describe my AI Agent project",
  },
  formation: {
    campaign: "formation_ia",
    frLabel: "Décrire mon besoin de formation IA",
    enLabel: "Describe my AI training needs",
  },
  accompagnement: {
    campaign: "accompagnement_ia",
    frLabel: "Décrire mon besoin d’accompagnement IA",
    enLabel: "Describe my AI advisory needs",
  },
};

const formationSignals = [
  "formation-", "atelier-ia-", "chatgpt-pour-", "chatgpt-entreprise-",
  "formateur-ia-", "questions/",
];
const accompagnementSignals = [
  "accompagnement-", "consultant-", "conferencier-", "interventions-",
  "qui-est-cyril", "ai-monthly",
];
const agentSignals = [
  "agent-ia-", "sales-b2b-", "creation-agents-", "creer-agent-",
  "definition-agent-", "exemples-agents-", "methode-fikolasai-",
  "mesurer-valeur-agent-", "immigration-lawyers-",
  "faq-agent-", "ressources-ia", "guides-ia", "glossaire-ia-",
  "solutions-ai-", "solutions-ia-", "contenus-ia",
];

function classify(relativePath) {
  const normalized = relativePath.replaceAll("\\", "/").toLowerCase();
  if (formationSignals.some((signal) => normalized.includes(signal))) return "formation";
  if (accompagnementSignals.some((signal) => normalized.includes(signal))) return "accompagnement";
  if (agentSignals.some((signal) => normalized.includes(signal))) return "agent";
  return null;
}

function trackedTally(route) {
  const params = new URLSearchParams({
    utm_source: "fikolasai",
    utm_medium: "website",
    utm_campaign: routes[route].campaign,
  });
  return `${tallyBase}?${params.toString().replaceAll("&", "&amp;")}`;
}

function replaceOfferContradictions(html, english) {
  let result = html
    .replace(/"price"\s*:\s*"1000"/g, '"price":"4990"')
    .replace(/analytics\.js\?v=[^"']+/g, "analytics.js?v=20260728-growth1");
  if (english) {
    result = result
      .replace(/€\s?1,?000/g, "€4,990")
      .replace(/1,?000\s?€/g, "€4,990")
      .replace(/\b(?:in|within)\s+7\s+(?:business\s+)?days\b/gi, "within 15 business days")
      .replace(/\b7-day\b/gi, "15-business-day")
      .replace(/\b7\s+days\b/gi, "15 business days")
      .replace(/>within 15 business days/g, ">Within 15 business days");
  } else {
    result = result
      .replace(/\b1[\s\u00a0]?000\s?€/g, "4 990 €")
      .replace(/\b1000\s?€/g, "4 990 €")
      .replace(/\b(?:en|sous)\s+7\s+jours(?:\s+ouvrés)?\b/gi, "sous 15 jours ouvrés")
      .replace(/\blivraison\s+(?:en|sous)\s+7\s+jours(?:\s+ouvrés)?\b/gi, "livraison sous 15 jours ouvrés")
      .replace(/\b7\s+jours\b/gi, "15 jours ouvrés");
  }
  return result;
}

function normalizeConversionLinks(html, route, english) {
  if (!route) return html;
  const href = trackedTally(route);
  const label = english ? routes[route].enLabel : routes[route].frLabel;

  return html.replace(
    /<a\b([^>]*\bhref="https:\/\/(?:tally\.so\/r\/2EbyZL|calendly\.com\/cyril-fikolasai\/rdv-cyril-fikolasai-agent)[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi,
    (match, attributes, content) => {
      // Preserve proof/resource links that happen to contain nested markup; conversion
      // buttons are identified by their visual button classes or short text content.
      const plainText = content.replace(/<[^>]+>/g, "").trim();
      const isButton = /\b(?:bg-gold|bg-primary|font-bold|font-semibold)\b/i.test(attributes)
        || plainText.length < 90;
      if (!isButton) return match;
      const updatedAttributes = attributes
        .replace(/\bhref="[^"]*"/i, `href="${href}"`)
        .replace(/\s+rel="[^"]*"/i, ' rel="noopener noreferrer"');
      return `<a${updatedAttributes}>${label}</a>`;
    }
  );
}

function updateHomeRoutes(html, english) {
  const agentHref = trackedTally("agent");
  const formationHref = trackedTally("formation");
  const advisoryHref = trackedTally("accompagnement");

  if (english) {
    html = html
      .replace(/Practical AI Agents for Business in 7 Days/g, "Business AI Agents Delivered Within 15 Business Days")
      .replace(
        /Your own AI Agent,<br><span([^>]*)>ready to use within 15 business days\.<\/span>/,
        "Remove one repetitive business task.<br><span$1>Your AI Agent is delivered within 15 business days.</span>"
      )
      .replace(/Your AI Agent (?:can|could) be ready next week\./g, "Your AI Agent can be ready within 15 business days.")
      .replace(/Check whether my AI Agent project is a fit|Discuss my project|Contact us/g, routes.agent.enLabel)
      .replace("You can then move to Agent, Studio or monthly support.", "You can stay independent, extend the system or choose monthly support.")
      .replace(/Your own AI Agent[^<]*7 days\./gi, "A business AI Agent built around one measurable workflow, delivered within 15 business days.")
      .replace(/href="https:\/\/tally\.so\/r\/2EbyZL[^"]*"/g, `href="${agentHref}"`);
  } else {
    html = html
      .replace(
        /Votre propre Agent IA,<br><span([^>]*)>opérationnel sous 15 jours ouvrés\.<\/span>/,
        'Supprimez une tâche métier répétitive.<br><span$1>Votre Agent IA est livré sous 15 jours ouvrés.</span>'
      )
      .replace(
        /Votre propre Agent IA opérationnel sous 15 jours ouvrés pour 4 990 € HT\. Simple, concret, prêt à utiliser\./g,
        "Transformez une tâche métier répétitive en Agent IA opérationnel, construit sur vos processus et livré sous 15 jours ouvrés."
      )
      .replace(/Votre Agent IA peut être prêt la semaine prochaine\./g, "Votre Agent IA peut être prêt sous 15 jours ouvrés.")
      .replace(/Vérifier si mon projet d’Agent IA est adapté|Étudier mon projet|Nous contacter/g, routes.agent.frLabel)
      .replace("Vous pouvez ensuite évoluer vers Agent, Studio ou accompagnement mensuel.", "Vous pouvez rester autonome, étendre le système ou choisir un accompagnement mensuel.");
  }

  html = html.replace(
    /<a href="#" class="text-xl font-semibold/g,
    `<a href="${english ? "/en/" : "/"}" class="text-xl font-semibold`
  );

  // Route homepage CTAs by their stable visual role.
  const routeByClass = (source, classSignal, href, label) => source.replace(
    new RegExp(`<a\\b([^>]*class="[^"]*${classSignal}[^"]*"[^>]*)>[^<]*<\\/a>`, "i"),
    (_match, attributes) => `<a${attributes.replace(/\bhref="[^"]*"/i, `href="${href}"`)}>${label}</a>`
  );
  html = routeByClass(
    html, "shadow-gold", agentHref,
    english ? routes.agent.enLabel : routes.agent.frLabel
  );
  html = routeByClass(
    html, "block text-center py-4 bg-gold", agentHref,
    english ? routes.agent.enLabel : routes.agent.frLabel
  );
  html = routeByClass(
    html, "mt-5 block text-center py-3 bg-primary", formationHref,
    english ? routes.formation.enLabel : routes.formation.frLabel
  );
  return html;
}

const files = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(fullPath);
    else if (entry.name === "index.html") files.push(fullPath);
  }
}

collect(root);
let changed = 0;
for (const file of files) {
  const relativePath = path.relative(root, file);
  const english = relativePath.replaceAll("\\", "/").startsWith("en/");
  const route = classify(relativePath);
  const before = fs.readFileSync(file, "utf8");
  let after = replaceOfferContradictions(before, english);
  after = normalizeConversionLinks(after, route, english);
  if (relativePath === "index.html" || relativePath === "en\\index.html" || relativePath === "en/index.html") {
    after = updateHomeRoutes(after, english);
  }
  after = after.replace(/[ \t]+(?=\r?$)/gm, "");
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    changed += 1;
  }
}

console.log(`Growth positioning updated ${changed} of ${files.length} pages.`);

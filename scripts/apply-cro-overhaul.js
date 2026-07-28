const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tally = {
  fr: "https://tally.so/r/2EbyZL?utm_source=fikolasai&amp;utm_medium=website&amp;utm_campaign=agent_ia",
  en: "https://tally.so/r/2EbyZL?utm_source=fikolasai&amp;utm_medium=website&amp;utm_campaign=agent_ia",
};

const heroFr = `
    <section class="max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-16">
      <div class="max-w-4xl">
          <p class="inline-flex rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold text-amber-100 mb-5">Agent IA métier sur mesure</p>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-normal leading-tight mb-5">Automatisez une tâche métier avec un Agent IA conçu pour votre entreprise</h1>
          <p class="text-lg md:text-xl text-slate-300 leading-relaxed mb-5">FikolasAI conçoit, teste et documente un Agent IA dédié à un processus précis de votre entreprise. Livraison cible sous 15 jours ouvrés après validation du périmètre.</p>
          <p class="text-3xl font-semibold text-white mb-6">À partir de 4 990 € HT</p>
          <a href="${tally.fr}" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center px-6 py-3 bg-gold text-slate-950 rounded-lg font-bold hover:bg-amber-200 transition shadow-gold">Décrire mon projet d’Agent IA</a>
          <p class="mt-3 text-sm text-slate-300">Réponse généralement sous 2 jours ouvrés. La demande initiale ne vous engage pas à commander.</p>
          <p class="mt-2 text-sm text-slate-400">Périmètre et coûts validés avant le démarrage.</p>
      </div>
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Périmètre défini avant lancement</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Prix validé avant démarrage</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Documentation remise</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Réponse généralement sous 2 jours ouvrés</p>
      </div>
    </section>`;

const heroEn = `
    <section class="max-w-7xl mx-auto px-5 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-16">
      <div class="max-w-4xl">
          <p class="inline-flex rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold text-amber-100 mb-5">Custom business AI Agent</p>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-normal leading-tight mb-5">Automate one business task with an AI Agent designed for your company</h1>
          <p class="text-lg md:text-xl text-slate-300 leading-relaxed mb-5">FikolasAI designs, tests and documents an AI Agent dedicated to one specific company process. Target delivery within 15 business days after scope approval.</p>
          <p class="text-3xl font-semibold text-white mb-6">Starting at €4,990 excluding VAT</p>
          <a href="${tally.en}" target="_blank" rel="noopener noreferrer" class="inline-flex justify-center px-6 py-3 bg-gold text-slate-950 rounded-lg font-bold hover:bg-amber-200 transition shadow-gold">Describe my AI Agent project</a>
          <p class="mt-3 text-sm text-slate-300">We generally reply within 2 business days. Submitting the initial request does not commit you to purchase.</p>
          <p class="mt-2 text-sm text-slate-400">Scope and costs approved before the project starts.</p>
      </div>
      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Scope defined before launch</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Price approved before work starts</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Documentation handed over</p>
        <p class="rounded-xl border border-white/10 bg-white/5 p-4">Reply generally provided within 2 business days</p>
      </div>
    </section>`;

const fitFr = `
    <section id="adequation" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="max-w-3xl mb-9"><p class="text-gold font-semibold mb-3">Qualification rapide</p><h2 class="text-3xl md:text-5xl font-semibold">Votre projet est-il adapté ?</h2></div>
      <div class="grid lg:grid-cols-2 gap-5">
        <article class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-7"><h3 class="text-2xl font-semibold mb-5">Votre projet est probablement adapté si…</h3><ul class="space-y-3 text-slate-200"><li>✓ une tâche répétitive mobilise régulièrement votre équipe ;</li><li>✓ des informations sont recherchées dans plusieurs documents ou outils ;</li><li>✓ vos collaborateurs recopient, vérifient ou reformulent fréquemment des données ;</li><li>✓ vous souhaitez obtenir un premier résultat concret rapidement ;</li><li>✓ une personne peut valider les réponses de l’agent.</li></ul></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h3 class="text-2xl font-semibold mb-5">Votre projet n’est probablement pas adapté si…</h3><ul class="space-y-3 text-slate-300"><li>— vous recherchez une IA totalement autonome sans supervision ;</li><li>— le besoin n’est pas encore clairement identifié ;</li><li>— personne ne peut participer aux validations ;</li><li>— le projet exige immédiatement une infrastructure critique complexe ;</li><li>— vous attendez une garantie de résultat commercial.</li></ul></article>
      </div>
      <a href="${tally.fr}" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex bg-gold text-slate-950 px-6 py-3 rounded-lg font-bold">Me décrire la tâche à automatiser</a>
      <p class="mt-3 text-sm text-slate-400">Réponse généralement sous 2 jours ouvrés. La demande initiale ne vous engage pas à commander.</p>
    </section>`;

const fitEn = `
    <section id="fit" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="max-w-3xl mb-9"><p class="text-gold font-semibold mb-3">Quick qualification</p><h2 class="text-3xl md:text-5xl font-semibold">Is your project a good fit?</h2></div>
      <div class="grid lg:grid-cols-2 gap-5">
        <article class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-7"><h3 class="text-2xl font-semibold mb-5">Your project is probably a good fit if…</h3><ul class="space-y-3 text-slate-200"><li>✓ a repetitive task regularly takes up team time;</li><li>✓ information must be found across documents or tools;</li><li>✓ people repeatedly copy, check or rewrite data;</li><li>✓ you want a concrete first result quickly;</li><li>✓ someone can validate the agent’s answers.</li></ul></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h3 class="text-2xl font-semibold mb-5">Your project is probably not a good fit if…</h3><ul class="space-y-3 text-slate-300"><li>— you expect fully autonomous AI without supervision;</li><li>— the need has not been identified yet;</li><li>— nobody can take part in validation;</li><li>— the project immediately requires complex critical infrastructure;</li><li>— you expect a guaranteed commercial outcome.</li></ul></article>
      </div>
      <a href="${tally.en}" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex bg-gold text-slate-950 px-6 py-3 rounded-lg font-bold">Describe the task to automate</a>
      <p class="mt-3 text-sm text-slate-400">We generally reply within 2 business days. Submitting the initial request does not commit you to purchase.</p>
    </section>`;

const offerFr = `
    <section id="offers" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <nav aria-label="Détails de l’offre" class="mb-10 flex flex-wrap gap-3 text-sm"><a href="#fonctionnement" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Fonctionnement</a><a href="#livrables" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Livrables</a><a href="#donnees" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Données</a><a href="#couts" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Coûts</a><a href="#faq" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">FAQ</a></nav>
      <div class="rounded-3xl border border-gold/50 bg-gold/10 p-7 md:p-10">
        <p class="text-gold font-semibold mb-3">Agent IA sur mesure</p><h2 class="text-3xl md:text-5xl font-semibold mb-5">Un cas d’usage précis, cadré avant le démarrage.</h2>
        <div class="grid lg:grid-cols-[1fr_.7fr] gap-8 items-start"><div><p class="text-xl text-slate-200 mb-5">Conception, tests, documentation et prise en main inclus.</p><p class="text-slate-300">Le prix final dépend du nombre de sources de données, d’intégrations, d’utilisateurs et d’automatisations nécessaires. Le périmètre et le prix sont validés avant le démarrage.</p></div><div><p class="text-4xl font-semibold">À partir de 4 990 € HT</p><p class="mt-3 text-amber-100">Livraison cible sous 15 jours ouvrés</p></div></div>
      </div>
      <div id="livrables" class="mt-12"><h2 class="text-3xl md:text-4xl font-semibold mb-6">Ce que vous recevez</h2><p class="text-slate-300 mb-6">À la fin du projet, vous recevez :</p><ul class="grid md:grid-cols-2 gap-3 text-slate-200"><li class="rounded-xl border border-white/10 bg-white/5 p-4">Un Agent IA configuré pour le cas d’usage validé</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">Les instructions et prompts nécessaires</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">La documentation d’utilisation</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">La liste des outils, comptes et intégrations</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">Un scénario de test et les résultats des tests</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">Une session de prise en main à distance</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">Des recommandations de maintenance et d’évolution</li><li class="rounded-xl border border-white/10 bg-white/5 p-4">Une description des éventuels coûts récurrents</li></ul><p class="mt-5 text-sm text-slate-400">Le périmètre exact des livrables est indiqué dans la proposition commerciale avant le démarrage.</p></div>
      <div class="mt-14"><h2 class="text-3xl md:text-4xl font-semibold mb-7">Exemples de cas d’usage</h2><div class="grid lg:grid-cols-3 gap-5">
        <article class="rounded-2xl border border-white/10 bg-white/5 p-6"><p class="text-xs uppercase tracking-wide text-gold mb-3">Exemple démonstratif</p><h3 class="text-xl font-semibold mb-3">Agent de qualification commerciale</h3><p class="text-slate-300 mb-4">Analyse les informations reçues, vérifie les critères définis et prépare une synthèse exploitable.</p><ul class="text-sm text-slate-400 space-y-2"><li>Objectif : moins de saisie manuelle</li><li>Objectif : réponses plus homogènes</li><li>Objectif : priorisation plus rapide</li></ul><p class="mt-5 text-xs text-slate-500">Exemple de cas d’usage — résultats variables selon l’organisation.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-6"><p class="text-xs uppercase tracking-wide text-gold mb-3">Exemple démonstratif</p><h3 class="text-xl font-semibold mb-3">Agent de recherche documentaire</h3><p class="text-slate-300 mb-4">Recherche dans une base documentaire validée et indique les sources utilisées.</p><ul class="text-sm text-slate-400 space-y-2"><li>Objectif : réduire le temps de recherche</li><li>Objectif : faciliter l’accès aux procédures</li><li>Objectif : limiter les réponses non sourcées</li></ul><p class="mt-5 text-xs text-slate-500">Exemple de cas d’usage — résultats variables selon l’organisation.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-6"><p class="text-xs uppercase tracking-wide text-gold mb-3">Exemple démonstratif</p><h3 class="text-xl font-semibold mb-3">Agent de veille métier</h3><p class="text-slate-300 mb-4">Surveille des sources définies, classe les informations et génère une synthèse.</p><ul class="text-sm text-slate-400 space-y-2"><li>Objectif : centraliser la veille</li><li>Objectif : éviter les recherches répétitives</li><li>Objectif : détecter les informations importantes</li></ul><p class="mt-5 text-xs text-slate-500">Exemple de cas d’usage — résultats variables selon l’organisation.</p></article>
      </div></div>
    </section>`;

const offerEn = offerFr
  .replace('langue', 'language')
  .replace(/Détails de l’offre/g, "Offer details")
  .replace(/Fonctionnement/g, "Process").replace(/Livrables/g, "Deliverables").replace(/Données/g, "Data").replace(/Coûts/g, "Costs")
  .replace(/Agent IA sur mesure/g, "Custom AI Agent")
  .replace(/Un cas d’usage précis, cadré avant le démarrage\./g, "One precise use case, scoped before work starts.")
  .replace(/Conception, tests, documentation et prise en main inclus\./g, "Design, testing, documentation and onboarding included.")
  .replace(/Le prix final dépend du nombre de sources de données, d’intégrations, d’utilisateurs et d’automatisations nécessaires\. Le périmètre et le prix sont validés avant le démarrage\./g, "The final price depends on the number of data sources, integrations, users and automations required. Scope and price are approved before work starts.")
  .replace(/À partir de 4 990 € HT/g, "Starting at €4,990 excluding VAT")
  .replace(/Livraison cible sous 15 jours ouvrés/g, "Target delivery within 15 business days")
  .replace(/Ce que vous recevez/g, "What you receive")
  .replace(/À la fin du projet, vous recevez :/g, "At the end of the project, you receive:")
  .replace(/Un Agent IA configuré pour le cas d’usage validé/g, "An AI Agent configured for the approved use case")
  .replace(/Les instructions et prompts nécessaires/g, "The required instructions and prompts")
  .replace(/La documentation d’utilisation/g, "User documentation")
  .replace(/La liste des outils, comptes et intégrations/g, "A list of tools, accounts and integrations")
  .replace(/Un scénario de test et les résultats des tests/g, "A test scenario and test results")
  .replace(/Une session de prise en main à distance/g, "A remote onboarding session")
  .replace(/Des recommandations de maintenance et d’évolution/g, "Maintenance and evolution recommendations")
  .replace(/Une description des éventuels coûts récurrents/g, "A description of potential recurring costs")
  .replace(/Le périmètre exact des livrables est indiqué dans la proposition commerciale avant le démarrage\./g, "The exact deliverable scope is stated in the commercial proposal before work starts.")
  .replace(/Exemples de cas d’usage/g, "Use case examples")
  .replace(/Exemple démonstratif/g, "Demonstration example")
  .replace(/Agent de qualification commerciale/g, "Sales qualification Agent")
  .replace(/Analyse les informations reçues, vérifie les critères définis et prépare une synthèse exploitable\./g, "Analyzes submitted information, checks defined criteria and prepares an actionable summary.")
  .replace(/Agent de recherche documentaire/g, "Document research Agent")
  .replace(/Recherche dans une base documentaire validée et indique les sources utilisées\./g, "Searches an approved document base and identifies the sources used.")
  .replace(/Agent de veille métier/g, "Industry monitoring Agent")
  .replace(/Surveille des sources définies, classe les informations et génère une synthèse\./g, "Monitors defined sources, classifies information and produces a summary.")
  .replace(/Exemple de cas d’usage — résultats variables selon l’organisation\./g, "Use case example — results vary by organization.")
  .replace(/Objectif : moins de saisie manuelle/g, "Goal: less manual data entry")
  .replace(/Objectif : réponses plus homogènes/g, "Goal: more consistent responses")
  .replace(/Objectif : priorisation plus rapide/g, "Goal: faster prioritization")
  .replace(/Objectif : réduire le temps de recherche/g, "Goal: reduce research time")
  .replace(/Objectif : faciliter l’accès aux procédures/g, "Goal: easier access to procedures")
  .replace(/Objectif : limiter les réponses non sourcées/g, "Goal: fewer unsourced answers")
  .replace(/Objectif : centraliser la veille/g, "Goal: centralize monitoring")
  .replace(/Objectif : éviter les recherches répétitives/g, "Goal: avoid repeated searches")
  .replace(/Objectif : détecter les informations importantes/g, "Goal: detect important information sooner");

const offerEnWithAnchors = offerEn
  .replace('href="#fonctionnement"', 'href="#process"')
  .replace('href="#donnees"', 'href="#data"')
  .replace('href="#couts"', 'href="#costs"');

const processFr = `
    <section id="fonctionnement" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="max-w-3xl mb-10"><p class="text-gold font-semibold mb-3">Déroulement</p><h2 class="text-3xl md:text-5xl font-semibold mb-4">Du besoin à la livraison en cinq étapes.</h2><p class="text-slate-400">Le délai cible de 15 jours ouvrés commence après validation du périmètre, réception des accès nécessaires et lancement officiel du projet.</p></div>
      <ol class="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">01</span><h3 class="font-semibold text-xl mt-3 mb-2">Qualification</h3><p class="text-sm text-slate-400">Vous décrivez la tâche, les utilisateurs et le résultat attendu.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">02</span><h3 class="font-semibold text-xl mt-3 mb-2">Cadrage</h3><p class="text-sm text-slate-400">Nous vérifions faisabilité, données, outils et limites.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">03</span><h3 class="font-semibold text-xl mt-3 mb-2">Proposition</h3><p class="text-sm text-slate-400">Vous recevez périmètre, calendrier, livrables et prix précis.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">04</span><h3 class="font-semibold text-xl mt-3 mb-2">Construction et tests</h3><p class="text-sm text-slate-400">L’agent est testé sur des scénarios représentatifs puis corrigé.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">05</span><h3 class="font-semibold text-xl mt-3 mb-2">Livraison</h3><p class="text-sm text-slate-400">Vous recevez l’agent, sa documentation et une prise en main.</p></li>
      </ol>
    </section>`;

const processEn = `
    <section id="process" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="max-w-3xl mb-10"><p class="text-gold font-semibold mb-3">Process</p><h2 class="text-3xl md:text-5xl font-semibold mb-4">From need to delivery in five steps.</h2><p class="text-slate-400">The target 15-business-day timeline starts after scope approval, receipt of required access and official project launch.</p></div>
      <ol class="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">01</span><h3 class="font-semibold text-xl mt-3 mb-2">Qualification</h3><p class="text-sm text-slate-400">You describe the task, users and expected outcome.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">02</span><h3 class="font-semibold text-xl mt-3 mb-2">Scoping</h3><p class="text-sm text-slate-400">We check feasibility, data, tools and limitations.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">03</span><h3 class="font-semibold text-xl mt-3 mb-2">Proposal</h3><p class="text-sm text-slate-400">You receive a precise scope, timeline, deliverables and price.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">04</span><h3 class="font-semibold text-xl mt-3 mb-2">Build and testing</h3><p class="text-sm text-slate-400">The agent is tested on representative scenarios and refined.</p></li>
        <li class="rounded-2xl border border-white/10 bg-white/5 p-5"><span class="text-gold font-semibold">05</span><h3 class="font-semibold text-xl mt-3 mb-2">Delivery</h3><p class="text-sm text-slate-400">You receive the agent, documentation and onboarding.</p></li>
      </ol>
    </section>`;

function replaceFirstSection(html, replacement) {
  return html.replace(/<section class="max-w-7xl mx-auto px-5 sm:px-6 (?:py-20 md:py-28|pt-12 pb-14 md:pt-16 md:pb-16)">[\s\S]*?<\/section>/, replacement.trim());
}

function replaceOffers(html, replacement) {
  return html.replace(/<section id="offers"[\s\S]*?<\/section>\s*(?=<section id="parcours"|<section id="journeys")/, `${replacement.trim()}\n\n    `);
}

function insertBeforeOffers(html, section) {
  if (html.includes(section.includes('id="adequation"') ? 'id="adequation"' : 'id="fit"')) return html;
  return html.replace(/(\s*<section id="offers")/, `\n${section.trim()}\n\n    $1`);
}

function replaceProcess(html, replacement) {
  return html.replace(/<section id="process"[\s\S]*?<\/section>/, replacement.trim());
}

function removeLegacyJourneys(html) {
  return html.replace(/\s*<section id="(?:parcours|journeys)"[\s\S]*?<\/section>/, "");
}

function normalizeClaims(html, english) {
  let out = html;
  if (english) {
    out = out
      .replaceAll('href="#fonctionnement"', 'href="#process"')
      .replaceAll('href="#donnees"', 'href="#data"')
      .replaceAll('href="#couts"', 'href="#costs"')
      .replace('href="/en/" hreflang="fr" aria-label="Version française"', 'href="/" hreflang="fr" aria-label="Version française"')
      .replace(/(?<!starting at )€4,990 excl\. VAT/g, "starting at €4,990 excl. VAT")
      .replace(/(?<!starting at )€4,990 excluding VAT/g, "starting at €4,990 excluding VAT")
      .replace(/monthly support (?:at|from) €500 excl\. VAT\/month/gi, "monthly support available on request")
      .replace(/€500 excl\. VAT\/month/gi, "a monthly fee defined in the proposal");
  } else {
    out = out
      .replaceAll('href="#process"', 'href="#fonctionnement"')
      .replace(/(?<![Àà] partir de )4 990 € HT/g, "à partir de 4 990 € HT")
      .replace(/(?<![Àà] partir de )4 990€ HT/g, "à partir de 4 990 € HT")
      .replace(/accompagnement mensuel (?:à|dès) 500 € HT\/mois/gi, "accompagnement mensuel disponible sur devis")
      .replace(/500 € HT\/mois/gi, "un tarif mensuel défini dans la proposition");
  }
  return out
    .replaceAll('href="/mentions-legales/"', 'href="/confidentialite/"')
    .replaceAll(">Mentions légales<", ">Confidentialité<")
    .replaceAll("See the €4,990 offer", "See the offer starting at €4,990")
    .replaceAll("la période de support prévue dans la proposition servent", "La période de support prévue dans la proposition sert")
    .replace(/Prix fixe de à partir de/gi, "Prix à partir de")
    .replace(/pour à partir de/gi, "à partir de")
    .replace(/for starting at/gi, "starting at")
    .replace(/starting at starting at/gi, "starting at");
}

for (const [relative, english] of [["index.html", false], [path.join("en", "index.html"), true]]) {
  const file = path.join(root, relative);
  let html = fs.readFileSync(file, "utf8");
  html = replaceFirstSection(html, english ? heroEn : heroFr);
  html = insertBeforeOffers(html, english ? fitEn : fitFr);
  html = replaceOffers(html, english ? offerEnWithAnchors : offerFr);
  html = removeLegacyJourneys(html);
  html = replaceProcess(html, english ? processEn : processFr);
  html = normalizeClaims(html, english);
  fs.writeFileSync(file, html.replace(/[ \t]+(?=\r?$)/gm, ""), "utf8");
}

const htmlFiles = [];
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (entry.name === "index.html") htmlFiles.push(full);
  }
}
collect(root);
for (const file of htmlFiles) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  const english = relative.startsWith("en/");
  const before = fs.readFileSync(file, "utf8");
  const after = normalizeClaims(before, english);
  if (after !== before) fs.writeFileSync(file, after, "utf8");
}

console.log("CRO core content applied.");

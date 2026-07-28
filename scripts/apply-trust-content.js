const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const trustFr = `
    <section id="donnees" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="max-w-3xl mb-10"><p class="text-gold font-semibold mb-3">Données, confidentialité et contrôle</p><h2 class="text-3xl md:text-5xl font-semibold mb-4">Vos données restent sous votre contrôle</h2><p class="text-slate-300">Les données nécessaires au projet sont définies avec vous avant toute connexion. L’objectif est de limiter les accès au strict nécessaire.</p></div>
      <div class="grid lg:grid-cols-2 gap-5">
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h3 class="text-2xl font-semibold mb-4">Principes appliqués</h3><ul class="space-y-3 text-slate-300"><li>Utiliser uniquement les données nécessaires.</li><li>Éviter les données sensibles lorsqu’elles ne sont pas indispensables.</li><li>Ne pas utiliser les données du client pour entraîner un modèle appartenant à FikolasAI, sauf accord exprès avec le client.</li><li>Limiter les accès aux personnes participant au projet.</li><li>Définir la suppression des copies de travail selon la durée de conservation convenue pour le projet.</li><li>Documenter les outils tiers utilisés.</li></ul><p class="mt-5 text-sm text-slate-400">Les conditions exactes de traitement, d’hébergement et de conservation dépendent des outils sélectionnés et sont précisées dans la proposition ou la documentation du projet.</p></article>
        <article class="rounded-2xl border border-amber-300/30 bg-amber-300/10 p-7"><h3 class="text-2xl font-semibold mb-4">Avant validation, ne transmettez pas</h3><ul class="grid sm:grid-cols-2 gap-3 text-slate-200"><li>Mots de passe</li><li>Clés API</li><li>Coordonnées bancaires</li><li>Dossiers médicaux</li><li>Données judiciaires</li><li>Documents confidentiels complets</li><li>Données personnelles sensibles</li><li>Secrets commerciaux non nécessaires</li></ul><p class="mt-5 font-semibold">Le premier formulaire sert uniquement à comprendre le besoin.</p></article>
      </div>
    </section>

    <section id="couts" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="grid lg:grid-cols-2 gap-5">
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Propriété et réversibilité</h2><p class="text-slate-300 mb-4">Sauf disposition contraire prévue dans la proposition commerciale, le client conserve la propriété de ses données, de ses documents et des comptes ouverts en son nom. Les livrables spécifiques réalisés pour le projet sont remis au client selon les conditions définies dans la proposition commerciale.</p><p class="text-slate-300 mb-4">Lorsque cela est techniquement possible, les outils et automatisations sont installés sur des comptes appartenant au client.</p><p class="text-sm text-slate-400">La proposition acceptée définit les éléments remis en cas d’arrêt afin de préparer, lorsque cela est techniquement possible, la continuité ou le transfert du système. Certaines plateformes tierces peuvent imposer leurs propres conditions d’export ou de transfert.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Hébergement</h2><p class="text-slate-300 mb-4">L’hébergement dépend du projet et des outils retenus. Il peut être réalisé sur les comptes du client ou auprès de fournisseurs tiers sélectionnés avec lui. Les outils, régions d’hébergement disponibles et coûts associés sont présentés avant le lancement.</p><p class="text-sm text-slate-400">Aucun hébergement spécifique en France ou dans l’Union européenne n’est promis tant qu’il n’a pas été effectivement sélectionné pour le projet.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Quels coûts après la livraison ?</h2><p class="text-slate-300 mb-4">Selon les outils utilisés : abonnement logiciel, crédits ou consommations d’API, hébergement, automatisation et maintenance optionnelle.</p><p class="text-slate-300 mb-4">Les coûts connus ou raisonnablement prévisibles sont présentés avant le démarrage et confirmés dans la proposition acceptée. Tout service récurrent FikolasAI reste optionnel et n’est facturé que s’il figure expressément dans cette proposition.</p><p class="text-sm text-slate-400">Les services tiers sont facturés directement par leurs fournisseurs ou refacturés uniquement si la proposition le précise.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Maintenance et évolution</h2><p class="text-slate-300 mb-4">Après la livraison, vous pouvez gérer l’agent de manière autonome, demander une intervention ponctuelle, souscrire un accompagnement mensuel ou le faire évoluer avec FikolasAI ou un autre prestataire.</p><p class="text-sm text-slate-400">Accompagnement mensuel disponible sur devis selon le niveau de supervision, de maintenance et d’évolution souhaité.</p></article>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
      <div class="grid lg:grid-cols-2 gap-5">
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Vos responsabilités pour tenir le calendrier</h2><ul class="space-y-3 text-slate-300"><li>Désigner une personne référente.</li><li>Fournir les informations et accès nécessaires.</li><li>Répondre aux demandes de validation.</li><li>Tester les scénarios proposés.</li><li>Signaler rapidement les erreurs ou contraintes métier.</li></ul><p class="mt-5 text-sm text-slate-400">Un retard de transmission ou de validation peut décaler la date de livraison.</p></article>
        <article class="rounded-2xl border border-white/10 bg-white/5 p-7"><h2 class="text-3xl font-semibold mb-4">Indicateurs de réussite</h2><p class="text-slate-300 mb-4">Avant de construire l’agent, nous choisissons ensemble un ou plusieurs indicateurs :</p><ul class="grid sm:grid-cols-2 gap-3 text-slate-300"><li>Temps moyen de la tâche</li><li>Nombre d’étapes manuelles</li><li>Taux de réponses exploitables</li><li>Nombre d’erreurs détectées</li><li>Délai de traitement</li><li>Satisfaction des utilisateurs internes</li></ul><p class="mt-5 text-sm text-slate-400">Une mesure initiale est recommandée afin de comparer la situation avant et après. Aucun résultat commercial n’est garanti.</p></article>
      </div>
    </section>`;

const trustEn = trustFr
  .replace(/id="donnees"/, 'id="data"').replace(/id="couts"/, 'id="costs"')
  .replace("Données, confidentialité et contrôle", "Data, confidentiality and control")
  .replace("Vos données restent sous votre contrôle", "Your data remains under your control")
  .replace("Les données nécessaires au projet sont définies avec vous avant toute connexion. L’objectif est de limiter les accès au strict nécessaire.", "We define the data required for the project with you before any connection is made. Access is limited to what is strictly necessary.")
  .replace("Principes appliqués", "Working principles")
  .replace("Utiliser uniquement les données nécessaires.", "Use only the data required.")
  .replace("Éviter les données sensibles lorsqu’elles ne sont pas indispensables.", "Avoid sensitive data unless it is essential.")
  .replace("Ne pas utiliser les données du client pour entraîner un modèle appartenant à FikolasAI, sauf accord exprès avec le client.", "Do not use client data to train a model owned by FikolasAI unless this is expressly agreed with the client.")
  .replace("Limiter les accès aux personnes participant au projet.", "Limit access to people working on the project.")
  .replace("Définir la suppression des copies de travail selon la durée de conservation convenue pour le projet.", "Define when working copies are deleted according to the retention period agreed for the project.")
  .replace("Documenter les outils tiers utilisés.", "Document the third-party tools used.")
  .replace("Les conditions exactes de traitement, d’hébergement et de conservation dépendent des outils sélectionnés et sont précisées dans la proposition ou la documentation du projet.", "Exact processing, hosting and retention terms depend on the selected tools and are stated in the proposal or project documentation.")
  .replace("Avant validation, ne transmettez pas", "Before validation, do not send")
  .replace("Mots de passe", "Passwords").replace("Clés API", "API keys").replace("Coordonnées bancaires", "Banking details").replace("Dossiers médicaux", "Medical records").replace("Données judiciaires", "Court or criminal records").replace("Documents confidentiels complets", "Complete confidential documents").replace("Données personnelles sensibles", "Sensitive personal data").replace("Secrets commerciaux non nécessaires", "Unnecessary trade secrets")
  .replace("Le premier formulaire sert uniquement à comprendre le besoin.", "The initial form is only used to understand your need.")
  .replace("Propriété et réversibilité", "Ownership and reversibility")
  .replace("Sauf disposition contraire prévue dans la proposition commerciale, le client conserve la propriété de ses données, de ses documents et des comptes ouverts en son nom. Les livrables spécifiques réalisés pour le projet sont remis au client selon les conditions définies dans la proposition commerciale.", "Unless the commercial proposal states otherwise, the client retains ownership of its data, documents and accounts opened in its name. Project-specific deliverables are handed over under the terms stated in the proposal.")
  .replace("Lorsque cela est techniquement possible, les outils et automatisations sont installés sur des comptes appartenant au client.", "Where technically possible, tools and automations are installed on client-owned accounts.")
  .replace("La proposition acceptée définit les éléments remis en cas d’arrêt afin de préparer, lorsque cela est techniquement possible, la continuité ou le transfert du système. Certaines plateformes tierces peuvent imposer leurs propres conditions d’export ou de transfert.", "The accepted proposal defines which handover materials are provided if support ends, so that continuity or transfer can be prepared where technically possible. Third-party platforms may impose their own export or transfer conditions.")
  .replace("Hébergement", "Hosting")
  .replace("L’hébergement dépend du projet et des outils retenus. Il peut être réalisé sur les comptes du client ou auprès de fournisseurs tiers sélectionnés avec lui. Les outils, régions d’hébergement disponibles et coûts associés sont présentés avant le lancement.", "Hosting depends on the project and selected tools. It may use client-owned accounts or third-party providers selected with the client. Available hosting regions, tools and costs are presented before launch.")
  .replace("Aucun hébergement spécifique en France ou dans l’Union européenne n’est promis tant qu’il n’a pas été effectivement sélectionné pour le projet.", "No specific hosting location in France or the European Union is promised until it has actually been selected for the project.")
  .replace("Quels coûts après la livraison ?", "What costs should you expect after delivery?")
  .replace("Selon les outils utilisés : abonnement logiciel, crédits ou consommations d’API, hébergement, automatisation et maintenance optionnelle.", "Depending on the tools used: software subscriptions, API credits or usage, hosting, automation and optional maintenance.")
  .replace("Les coûts connus ou raisonnablement prévisibles sont présentés avant le démarrage et confirmés dans la proposition acceptée. Tout service récurrent FikolasAI reste optionnel et n’est facturé que s’il figure expressément dans cette proposition.", "Known or reasonably foreseeable costs are presented before work starts and confirmed in the accepted proposal. Any recurring FikolasAI service is optional and is charged only when expressly included in that proposal.")
  .replace("Les services tiers sont facturés directement par leurs fournisseurs ou refacturés uniquement si la proposition le précise.", "Third-party services are billed directly by their providers or re-billed only when stated in the proposal.")
  .replace("Maintenance et évolution", "Maintenance and evolution")
  .replace("Après la livraison, vous pouvez gérer l’agent de manière autonome, demander une intervention ponctuelle, souscrire un accompagnement mensuel ou le faire évoluer avec FikolasAI ou un autre prestataire.", "After delivery, you can manage the agent independently, request one-off help, choose monthly support, or evolve it with FikolasAI or another provider.")
  .replace("Accompagnement mensuel disponible sur devis selon le niveau de supervision, de maintenance et d’évolution souhaité.", "Monthly support is quoted according to the required level of supervision, maintenance and evolution.")
  .replace("Vos responsabilités pour tenir le calendrier", "Your responsibilities for keeping the timeline")
  .replace("Désigner une personne référente.", "Appoint one project contact.").replace("Fournir les informations et accès nécessaires.", "Provide the required information and access.").replace("Répondre aux demandes de validation.", "Respond to validation requests.").replace("Tester les scénarios proposés.", "Test the proposed scenarios.").replace("Signaler rapidement les erreurs ou contraintes métier.", "Report errors or business constraints promptly.")
  .replace("Un retard de transmission ou de validation peut décaler la date de livraison.", "Delays in providing information or approvals may move the delivery date.")
  .replace("Indicateurs de réussite", "Success indicators")
  .replace("Avant de construire l’agent, nous choisissons ensemble un ou plusieurs indicateurs :", "Before building the agent, we choose one or more indicators together:")
  .replace("Temps moyen de la tâche", "Average task time").replace("Nombre d’étapes manuelles", "Number of manual steps").replace("Taux de réponses exploitables", "Rate of usable responses").replace("Nombre d’erreurs détectées", "Number of detected errors").replace("Délai de traitement", "Processing time").replace("Satisfaction des utilisateurs internes", "Internal user satisfaction")
  .replace("Une mesure initiale est recommandée afin de comparer la situation avant et après. Aucun résultat commercial n’est garanti.", "A baseline measurement is recommended for before-and-after comparison. No commercial outcome is guaranteed.");

const faq = {
  fr: [
    ["Quel type de tâche peut être automatisé ?", "Une tâche précise, répétitive, basée sur des règles ou des documents et dont le résultat peut être validé par une personne."],
    ["Comment savoir si mon projet est adapté ?", "La qualification vérifie la fréquence de la tâche, les données disponibles, les utilisateurs concernés, la supervision et le résultat attendu."],
    ["Pourquoi le prix commence-t-il à 4 990 € HT ?", "Le prix couvre le cadrage, la conception, les tests, la documentation et la prise en main. Le montant final dépend des sources, intégrations, utilisateurs et automatisations."],
    ["Quand commence le délai de 15 jours ouvrés ?", "Après validation du périmètre, réception des accès nécessaires et lancement officiel du projet."],
    ["À qui appartient l’agent ?", "Le client conserve ses données, documents et comptes. Les conditions de remise des livrables spécifiques sont précisées dans la proposition commerciale."],
    ["Où est-il hébergé ?", "Sur des comptes client ou chez des fournisseurs tiers sélectionnés avec lui. Les régions disponibles et les coûts sont présentés avant le lancement."],
    ["Quels coûts faut-il prévoir après la livraison ?", "Ils peuvent inclure logiciels, API, hébergement, automatisation et maintenance optionnelle. Les coûts connus ou raisonnablement prévisibles sont confirmés dans la proposition acceptée."],
    ["Mes données sont-elles utilisées pour entraîner une IA ?", "Le traitement prévu n’inclut pas l’entraînement d’un modèle appartenant à FikolasAI, sauf accord contraire expressément convenu avec le client. Les conditions des outils tiers retenus sont documentées avant connexion."],
    ["Puis-je changer de prestataire ?", "Oui, dans les limites techniques des plateformes tierces. Les éléments remis et leurs modalités de transmission sont définis dans la proposition acceptée."],
    ["Que se passe-t-il si le projet n’est pas techniquement réalisable ?", "La faisabilité est vérifiée avant le lancement. Si une contrainte majeure est identifiée avant validation de la proposition, le projet ne démarre pas. Si une impossibilité apparaît après le lancement, la situation est analysée avec le client afin d’adapter le périmètre ou d’arrêter la partie concernée selon les conditions prévues dans la proposition commerciale."],
    ["Puis-je demander des modifications après la livraison ?", "Oui, selon les modalités d’intervention ponctuelle ou récurrente précisées dans la proposition ou dans un devis complémentaire."],
    ["L’agent fonctionne-t-il sans supervision humaine ?", "Non par défaut. Le niveau de supervision est défini selon le risque du processus et les sorties importantes restent validables."],
    ["Les résultats sont-ils garantis ?", "Non. Les résultats dépendent des données, de l’adoption, du processus existant et de la supervision humaine. Les objectifs et indicateurs sont définis avant le développement."],
    ["Quels outils peuvent être connectés ?", "Cela dépend des API, autorisations et contraintes de sécurité des outils concernés. La faisabilité est vérifiée pendant le cadrage."],
    ["Comment se passe le premier échange ?", "Vous décrivez votre besoin dans le formulaire. Une réponse personnalisée est généralement envoyée sous 2 jours ouvrés et, si le projet semble adapté, un échange à distance est proposé."]
  ],
  en: [
    ["What type of task can be automated?", "A precise, repetitive task based on rules or documents, with an output that a person can validate."],
    ["How do I know whether my project is a good fit?", "Qualification checks task frequency, available data, users, supervision and the expected outcome."],
    ["Why does pricing start at €4,990 excluding VAT?", "Pricing covers scoping, design, testing, documentation and onboarding. The final amount depends on sources, integrations, users and automations."],
    ["When does the 15-business-day timeline start?", "After scope approval, receipt of required access and official project launch."],
    ["Who owns the agent?", "The client retains its data, documents and accounts. Terms for handing over specific deliverables are stated in the commercial proposal."],
    ["Where is it hosted?", "On client-owned accounts or with third-party providers selected with the client. Available regions and costs are presented before launch."],
    ["What costs should I expect after delivery?", "They may include software, API usage, hosting, automation and optional maintenance. Known or reasonably foreseeable costs are confirmed in the accepted proposal."],
    ["Is my data used to train AI?", "The planned processing does not include training a model owned by FikolasAI, unless otherwise expressly agreed with the client. The terms of selected third-party tools are documented before connection."],
    ["Can I change providers?", "Yes, within the technical limits of third-party platforms. The handover materials and their delivery terms are defined in the accepted proposal."],
    ["What happens if the project is not technically feasible?", "Feasibility is checked before launch. If a major constraint is found before proposal approval, the project does not start. If an impossibility appears after launch, the situation is reviewed with the client to adjust the scope or stop the affected part under the terms of the commercial proposal."],
    ["Can I request changes after delivery?", "Yes, under one-off or recurring support terms stated in the proposal or a separate quote."],
    ["Does the agent work without human supervision?", "Not by default. Supervision is defined according to process risk, and important outputs remain available for validation."],
    ["Are results guaranteed?", "No. Results depend on data, adoption, the existing process and human supervision. Objectives and indicators are defined before development."],
    ["Which tools can be connected?", "This depends on the APIs, permissions and security constraints of the tools concerned. Feasibility is checked during scoping."],
    ["What happens after I submit the form?", "You describe your need in the form. We generally send a personal reply within 2 business days and, if the project appears suitable, a remote call is proposed."]
  ]
};

function faqSection(language) {
  const heading = language === "fr" ? "Questions fréquentes avant de démarrer" : "Common questions before getting started";
  return `<section id="faq" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10"><h2 class="text-3xl md:text-5xl font-semibold mb-10">${heading}</h2><div class="grid md:grid-cols-2 gap-5">${faq[language].map(([q, a]) => `<article class="rounded-2xl bg-white/5 border border-white/10 p-6"><h3 class="text-xl font-semibold mb-3">${q}</h3><p class="text-slate-400">${a}</p></article>`).join("")}</div></section>`;
}

function updateJsonLd(html, language) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (whole, raw) => {
    try {
      const data = JSON.parse(raw);
      const nodes = data["@graph"] || [data];
      for (const node of nodes) {
        if (node["@type"] === "FAQPage") {
          node.mainEntity = faq[language].map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } }));
        }
        if (node["@type"] === "Service" && node.offers) {
          node.offers.description = language === "fr"
            ? "Prix à partir de 4 990 € HT. Le prix final et les coûts récurrents éventuels sont validés avant le démarrage."
            : "Starting at €4,990 excluding VAT. The final price and any recurring costs are approved before work starts.";
        }
      }
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    } catch {
      return whole;
    }
  });
}

for (const [relative, language] of [["index.html", "fr"], [path.join("en", "index.html"), "en"]]) {
  const file = path.join(root, relative);
  let html = fs.readFileSync(file, "utf8");
  const trust = language === "fr" ? trustFr : trustEn;
  if (!html.includes(language === "fr" ? 'id="donnees"' : 'id="data"')) {
    html = html.replace(/(\s*<section id="about")/, `\n${trust.trim()}\n\n    $1`);
  }
  html = html.replace(/<section id="faq"[\s\S]*?<\/section>/, faqSection(language));
  html = updateJsonLd(html, language);
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
  const before = fs.readFileSync(file, "utf8");
  const english = path.relative(root, file).replaceAll("\\", "/").startsWith("en/");
  const after = before
    .replace(/(?:30 jours|1 mois) (?:d’ajustements après livraison|de suivi inclus)/gi, "modalités de support précisées dans la proposition")
    .replace(/(?:30 days|1 month) of (?:post-delivery adjustments|support included)/gi, "support terms stated in the proposal")
    .replace(/les 30 jours inclus/gi, "la période de support prévue dans la proposition")
    .replace(/the 30 included days/gi, "the support period stated in the proposal");
  if (after !== before) fs.writeFileSync(file, updateJsonLd(after, english ? "en" : "fr"), "utf8");
}

console.log("Trust, data, cost and FAQ content applied.");

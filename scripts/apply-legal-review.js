const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "scripts") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (entry.name === "index.html") files.push(full);
  }
}

function prudentCommercialClaims(html, english) {
  let output = html;

  if (english) {
    output = output
      .replaceAll("Personal reply within 2 business days. No commitment.", "We generally reply within 2 business days. Submitting the initial request does not commit you to purchase.")
      .replaceAll("Personal reply within 2 business days", "We generally reply within 2 business days")
      .replaceAll("Reply within 2 business days", "Reply generally provided within 2 business days")
      .replaceAll("A personal reply is sent within 2 business days", "We generally send a personal reply within 2 business days")
      .replaceAll("delivered within 15 business days", "with a target delivery within 15 business days")
      .replaceAll("delivered in within 15 business days", "targeted for delivery within 15 business days")
      .replaceAll("Your AI Agent within 15 business days", "Your AI Agent: target delivery within 15 business days")
      .replace(/(?<!target )delivery within 15 business days/g, "target delivery within 15 business days")
      .replaceAll("Your AI Agent can be ready within 15 business days.", "Target: an AI Agent ready within 15 business days after scope approval.")
      .replaceAll("then I build it within 15 business days.", "with a target build time of 15 business days after scope approval.")
      .replaceAll("We deliver one under 15 business days.", "The target is to deliver one within 15 business days after scope approval.")
      .replaceAll("Within 15 business days, I build an AI Agent", "The target, after scope approval, is to build an AI Agent within 15 business days")
      .replaceAll("I deliver the agent within 15 business days.", "the target is to deliver the agent within 15 business days after scope approval.")
      .replaceAll("A usable first version within 15 business days, then adjusted with you.", "Target: a usable first version within 15 business days after scope approval, then adjustments under the terms of the proposal.")
      .replaceAll("deliver it within 15 business days.", "target delivery is within 15 business days after scope approval.")
      .replaceAll("deliver one within 15 business days.", "target delivery is within 15 business days after scope approval.")
      .replace(/(?<!targeted to be )ready within 15 business days/g, "targeted to be ready within 15 business days after scope approval")
      .replaceAll("1 month of support included", "support terms defined in the accepted proposal")
      .replaceAll("1 month included", "support terms defined in the accepted proposal")
      .replaceAll("The included 30 days are used to stabilize usage and avoid a forgotten gadget.", "Any post-delivery support period and its scope are defined in the accepted proposal.")
      .replaceAll("What happens after 30 days?", "What happens after delivery?")
      .replace(/You choose: keep the agent or continue with monthly support from €500 excl\. VAT to maintain and improve 1, 2 or 3 active agents\./g, "You can operate independently or request optional support. Its scope and price are defined in a separate accepted proposal.")
      .replaceAll("After the included month", "After delivery")
      .replaceAll("Risk is limited: fixed price, short timeline, 1 month included and no forced subscription.", "Commercial risk is framed by a defined scope, a price stated in the accepted proposal and no automatic recurring service.")
      .replaceAll("AI Agents deployed</strong><span class=\"text-slate-400\">in France and the United States", "Remote collaboration</strong><span class=\"text-slate-400\">France and United States time zones can be discussed")
      .replaceAll(">delivery</span>", ">target timeline</span>")
      .replaceAll(">Free</b><span class=\"text-slate-300\">you choose afterwards</span>", ">Optional</b><span class=\"text-slate-300\">no automatic recurring service</span>")
      .replaceAll("<b class=\"block text-2xl\">1 month</b><span class=\"text-slate-300\">support included</span>", "<b class=\"block text-2xl\">Proposal</b><span class=\"text-slate-300\">support scope defined before work starts</span>")
      .replace(/(?:You can keep the agent or continue with|Yes\. After delivery, you can keep it or continue with) monthly support from €500 excl\. VAT[^.<]*(?:\.)?/g, "Optional support is available under a separate accepted proposal.")
      .replace(/monthly support from €500 excl\. VAT[^.<]*(?:\.)?/g, "optional support under a separate accepted proposal.")
      .replaceAll("Risk is limited: fixed price, short timeline, support terms defined in the accepted proposal and no forced subscription.", "Commercial risk is framed by a defined scope, a price stated in the accepted proposal and no automatic recurring service.")
      .replaceAll("It is not used to train a model owned by FikolasAI.", "The planned processing does not include training a model owned by FikolasAI, unless otherwise expressly agreed with the client.")
      .replaceAll("Never use your data to train a model owned by FikolasAI.", "Do not use client data to train a model owned by FikolasAI unless this is expressly agreed with the client.")
      .replaceAll("Delete working copies when no longer required.", "Define when working copies are deleted according to the retention period agreed for the project.")
      .replaceAll("No additional FikolasAI subscription is required to retain access to deliverables unless the client explicitly chooses a recurring service.", "Any recurring FikolasAI service is optional and is charged only when expressly included in the accepted proposal.")
      .replaceAll("If support ends, the client receives what is needed to continue, transfer or hand the system to another provider.", "The accepted proposal defines which handover materials are provided if support ends, so that continuity or transfer can be prepared where technically possible.")
      .replaceAll("Handover materials are provided under the terms of the proposal.", "The handover materials and their delivery terms are defined in the accepted proposal.")
      .replaceAll("These costs are presented before work starts.", "Known or reasonably foreseeable costs are presented before work starts and confirmed in the accepted proposal.")
      .replaceAll("They are presented before work starts.", "Known or reasonably foreseeable costs are presented before work starts and confirmed in the accepted proposal.");
  } else {
    output = output
      .replaceAll("Réponse personnalisée sous 2 jours ouvrés. Aucun engagement.", "Réponse généralement sous 2 jours ouvrés. La demande initiale ne vous engage pas à commander.")
      .replaceAll("Réponse personnalisée sous 2 jours ouvrés", "Réponse généralement sous 2 jours ouvrés")
      .replaceAll("Réponse sous 2 jours ouvrés", "Réponse généralement sous 2 jours ouvrés")
      .replaceAll("Une réponse personnalisée est envoyée sous 2 jours ouvrés", "Une réponse personnalisée est généralement envoyée sous 2 jours ouvrés")
      .replaceAll("livré sous 15 jours ouvrés", "avec un objectif de livraison sous 15 jours ouvrés")
      .replaceAll("livrée sous 15 jours ouvrés", "avec un objectif de livraison sous 15 jours ouvrés")
      .replaceAll("Votre Agent IA sous 15 jours ouvrés", "Votre Agent IA : objectif 15 jours ouvrés")
      .replace(/(?<!objectif de )livraison sous 15 jours ouvrés/g, "objectif de livraison sous 15 jours ouvrés")
      .replaceAll("Votre Agent IA peut être prêt sous 15 jours ouvrés.", "Objectif : un Agent IA prêt sous 15 jours ouvrés après validation du périmètre.")
      .replaceAll("puis je le construis sous 15 jours ouvrés.", "avec un objectif de construction sous 15 jours ouvrés après validation du périmètre.")
      .replaceAll("on le livre sous 15 jours ouvrés.", "l’objectif est de le livrer sous 15 jours ouvrés après validation du périmètre.")
      .replaceAll("je vous livre l’agent sous 15 jours ouvrés.", "l’objectif est de livrer l’agent sous 15 jours ouvrés après validation du périmètre.")
      .replaceAll("Une première version utilisable sous 15 jours ouvrés, puis ajustée avec vous.", "Objectif : une première version utilisable sous 15 jours ouvrés après validation du périmètre, puis des ajustements selon la proposition.")
      .replaceAll("prêt sous 15 jours ouvrés", "visé sous 15 jours ouvrés après validation du périmètre")
      .replaceAll("1 mois de suivi inclus", "modalités de support définies dans la proposition acceptée")
      .replaceAll("1 mois inclus", "modalités de support définies dans la proposition acceptée")
      .replaceAll("30 jours d’ajustements inclus", "modalités d’ajustement définies dans la proposition acceptée")
      .replaceAll("Que se passe-t-il après 30 jours ?", "Que se passe-t-il après la livraison ?")
      .replace(/Vous choisissez : récupérer l’agent ou continuer avec un suivi mensuel à partir de 500€ HT pour maintenir et améliorer 1, 2 ou 3 agents actifs\./g, "Vous pouvez fonctionner de manière autonome ou demander un accompagnement optionnel, dont le périmètre et le prix sont définis dans une proposition distincte.")
      .replaceAll("Après le mois inclus", "Après la livraison")
      .replaceAll("Le risque est limité : prix fixe, délai court, 1 mois inclus et aucun abonnement imposé.", "Le risque commercial est cadré par un périmètre défini, un prix indiqué dans la proposition acceptée et l’absence de service récurrent automatique.")
      .replaceAll("Agents IA déployés</strong><span class=\"text-slate-400\">en France et aux États-Unis", "Collaboration à distance</strong><span class=\"text-slate-400\">les fuseaux France et États-Unis peuvent être étudiés")
      .replaceAll(">livraison</span>", ">délai cible</span>")
      .replaceAll(">Libre</b><span class=\"text-slate-300\">vous choisissez ensuite</span>", ">Optionnel</b><span class=\"text-slate-300\">aucun service récurrent automatique</span>")
      .replaceAll("<b class=\"block text-2xl\">1 mois</b><span class=\"text-slate-300\">suivi inclus</span>", "<b class=\"block text-2xl\">Proposition</b><span class=\"text-slate-300\">périmètre du support défini avant démarrage</span>")
      .replace(/(?:Option 2 : |Vous pouvez garder l’agent ou continuer avec un |Vous pouvez le récupérer ou continuer avec un )?accompagnement mensuel (?:à partir de |à )?500€ HT[^.<]*(?:\.)?/g, "Un accompagnement optionnel peut faire l’objet d’une proposition distincte acceptée.")
      .replace(/Agent Care à partir de 500€ HT par mois[^.<]*(?:\.)?/g, "un accompagnement optionnel défini dans une proposition distincte acceptée.")
      .replaceAll("Le risque est limité : prix fixe, délai court, modalités de support définies dans la proposition acceptée et aucun abonnement imposé.", "Le risque commercial est cadré par un périmètre défini, un prix indiqué dans la proposition acceptée et l’absence de service récurrent automatique.")
      .replaceAll("Elles ne sont pas utilisées pour entraîner un modèle appartenant à FikolasAI.", "Le traitement prévu n’inclut pas l’entraînement d’un modèle appartenant à FikolasAI, sauf accord contraire expressément convenu avec le client.")
      .replaceAll("Ne pas utiliser vos données pour entraîner un modèle appartenant à FikolasAI.", "Ne pas utiliser les données du client pour entraîner un modèle appartenant à FikolasAI, sauf accord exprès avec le client.")
      .replaceAll("Supprimer les copies de travail devenues inutiles.", "Définir la suppression des copies de travail selon la durée de conservation convenue pour le projet.")
      .replaceAll("Aucun abonnement FikolasAI supplémentaire n’est imposé pour conserver l’accès aux livrables, sauf service récurrent explicitement choisi.", "Tout service récurrent FikolasAI reste optionnel et n’est facturé que s’il figure expressément dans la proposition acceptée.")
      .replaceAll("En cas d’arrêt, le client reçoit les éléments nécessaires pour continuer, transférer ou faire reprendre le système.", "La proposition acceptée définit les éléments remis en cas d’arrêt afin de préparer, lorsque cela est techniquement possible, la continuité ou le transfert du système.")
      .replaceAll("Les éléments nécessaires à la reprise sont remis selon la proposition.", "Les éléments remis et leurs modalités de transmission sont définis dans la proposition acceptée.")
      .replaceAll("Ces coûts sont présentés avant le démarrage.", "Les coûts connus ou raisonnablement prévisibles sont présentés avant le démarrage et confirmés dans la proposition acceptée.")
      .replaceAll("Ils sont présentés avant le démarrage.", "Les coûts connus ou raisonnablement prévisibles sont présentés avant le démarrage et confirmés dans la proposition acceptée.");
  }

  return output
    .replace(/(?:target ){2,}delivery/gi, "target delivery")
    .replace(/with a (?:target ){2,}delivery/gi, "with a target delivery")
    .replace(/(?:objectif de ){2,}livraison/gi, "objectif de livraison")
    .replace(/(?:après validation du périmètre\s*){2,}/gi, "après validation du périmètre")
    .replace(/Objectif : un Agent IA visé sous 15 jours ouvrés après validation du périmètre\.?/gi, "Objectif : un Agent IA prêt sous 15 jours ouvrés après validation du périmètre.")
    .replace(/(?:targeted to be ){2,}ready within 15 business days(?: after scope approval)+/gi, "targeted to be ready within 15 business days after scope approval")
    .replace(/targeted to be ready within 15 business days(?: after scope approval){2,}/gi, "targeted to be ready within 15 business days after scope approval");
}

function updateJsonLd(html, english) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, (whole, raw) => {
    try {
      const parsed = JSON.parse(raw);
      return `<script type="application/ld+json">${JSON.stringify(parsed)}</script>`;
    } catch {
      return whole;
    }
  });
}

collect(root);
for (const file of files) {
  const english = path.relative(root, file).replaceAll("\\", "/").startsWith("en/");
  const before = fs.readFileSync(file, "utf8");
  const after = updateJsonLd(prudentCommercialClaims(before, english), english)
    .replace(/[ \t]+(?=\r?$)/gm, "");
  if (after !== before) fs.writeFileSync(file, after, "utf8");
}

console.log(`Legal claim wording reviewed on ${files.length} pages.`);

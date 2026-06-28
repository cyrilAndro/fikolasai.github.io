(() => {
  const english = new Map([
    ["FikolasAI | Votre Agent IA sous 15 jours ouvrés", "FikolasAI | Your AI Agent within 15 business days"],
    ["Offres", "Offers"],
    ["Métiers", "Industries"],
    ["Voir toutes les solutions IA par métier", "View all AI solutions by industry"],
    ["Preuves", "Proof"],
    ["Créer mon Agent IA", "Create my AI Agent"],
    ["Offre principale · Livraison sous 15 jours ouvrés", "Main offer · Delivered within 15 business days"],
    ["Votre propre Agent IA,", "Your own AI Agent,"],
    ["opérationnel sous 15 jours ouvrés.", "ready to use within 15 business days."],
    ["FikolasAI conçoit et déploie un Agent IA adapté à votre activité, vos données et vos règles métier. Pas une démo gadget : un système testé, documenté et prêt à produire, avec une prise en main accompagnée.", "FikolasAI designs and deploys an AI Agent around your business, data and operating rules. Not a gadget demo: a tested, documented system ready for real work, with guided onboarding."],
    ["Voir les offres", "View offers"],
    ["4 990 €", "€4,990"],
    ["HT, prix clair", "excl. VAT, clear price"],
    ["15 jours ouvrés", "15 business days"],
    ["livraison rapide", "fast delivery"],
    ["1 agent", "1 agent"],
    ["adapté à votre métier", "adapted to your work"],
    ["0 jargon", "no jargon"],
    ["prise en main simple", "easy to use"],
    ["Founder & CEO de FikolasAI Academy, créateur de FikolasAI Agent", "Founder & CEO of FikolasAI Academy, creator of FikolasAI Agent"],
    ["Promesse", "Promise"],
    ["Votre Agent IA mis en place sous 15 jours ouvrés pour 4 990 € HT.", "Your AI Agent set up in within 15 business days for €4,990 excl. VAT."],
    ["Pourquoi cette offre", "Why this offer"],
    ["Un périmètre volontairement limité pour livrer un premier usage concret rapidement.", "A deliberately focused scope to deliver a practical first use case quickly."],
    ["Après", "What comes next"],
    ["Vous pouvez ensuite évoluer vers Agent, Studio ou accompagnement mensuel.", "You can then move to Agent, Studio or ongoing monthly support."],
    ["L'offre qui va ouvrir la porte", "The offer that gets you started"],
    ["Commencez par votre Agent IA. Passez aux autres offres ensuite.", "Start with your AI Agent. Expand to other offers later."],
    ["Un forfait clair pour cadrer, construire, tester et déployer votre Agent IA métier. Vous repartez avec un système opérationnel, sa documentation et 30 jours d'ajustements après livraison.", "A clear fixed-price engagement to scope, build, test and deploy your business AI Agent. You receive an operational system, documentation and 30 days of post-delivery adjustments."],
    ["Offre principale", "Main offer"],
    ["Votre Agent IA", "Your AI Agent"],
    ["Votre Agent IA métier cadré, construit, testé et déployé sous 15 jours ouvrés. Une mise en œuvre complète pour passer rapidement à un usage réel.", "Your business AI Agent scoped, built, tested and deployed within 15 business days. A complete implementation designed for rapid real-world use."],
    ["✓ Cadrage de votre besoin métier", "✓ Scoping of your business need"],
    ["✓ Construction de votre Agent IA", "✓ Building your AI Agent"],
    ["✓ Tests sur vos cas concrets", "✓ Testing on your real use cases"],
    ["✓ Livraison et prise en main simple", "✓ Delivery and easy onboarding"],
    ["Pas besoin de devenir expert IA. Vous repartez avec un agent utile, adapté à votre activité et prêt à être utilisé.", "You do not need to become an AI expert. You leave with a useful agent adapted to your business and ready to use."],
    ["Forfait de mise en œuvre", "Implementation package"],
    ["HT · livraison sous 15 jours ouvrés", "excl. VAT · delivered within 15 business days"],
    ["inclus", "included"],
    ["Cadrage + mise en place", "Scoping + setup"],
    ["Prise en main", "Onboarding"],
    ["incluse", "included"],
    ["Je veux mon Agent IA", "I want my AI Agent"],
    ["Formation IA personnalisée", "Personalized AI training"],
    ["Pour apprendre vite, sans se disperser, avec une session hebdomadaire et un livrable concret.", "Learn quickly without losing focus, with a weekly session and one practical deliverable."],
    ["✓ 4 sessions de mentorat par mois", "✓ 4 mentoring sessions per month"],
    ["✓ Cas d'usage adaptés à votre métier", "✓ Use cases adapted to your work"],
    ["✓ Prompts, méthodes et workflows réutilisables", "✓ Reusable prompts, methods and workflows"],
    ["✓ Aucun prérequis technique", "✓ No technical background required"],
    ["499€", "€499"],
    ["/mois HT", "/month excl. VAT"],
    ["Discuter de mon besoin IA", "Discuss my AI needs"],
    ["Système d'agents IA", "AI agent system"],
    ["Pour les solopreneurs et PME qui veulent orchestrer plusieurs agents autour d'un même objectif business.", "For solopreneurs and SMBs that want to orchestrate several agents around one business goal."],
    ["✓ Agent maître d'orchestration", "✓ Master orchestration agent"],
    ["✓ 2 à 3 agents satellites", "✓ 2 to 3 satellite agents"],
    ["✓ Automatisations connectées à vos outils", "✓ Automations connected to your tools"],
    ["✓ Maintenance, sécurité et évolution", "✓ Maintenance, security and ongoing improvements"],
    ["Dès 799€", "From €799"],
    ["+ onboarding à partir de 3990€ HT", "+ onboarding from €3,990 excl. VAT"],
    ["Pourquoi ça donne envie", "Why it makes sense"],
    ["Un Agent IA à vous. Pas une promesse floue.", "Your own AI Agent. Not a vague promise."],
    ["L'offre est pensée pour créer un premier résultat rapide. Ensuite, vous pouvez choisir la formation, l'optimisation continue ou un système d'agents complet.", "The offer is designed to deliver a useful first outcome quickly. You can then choose training, continuous optimization or a complete agent system."],
    ["Relances manuelles réduites", "Fewer manual follow-ups"],
    ["Un agent peut préparer, structurer ou accélérer les suivis qui prennent trop de temps.", "An agent can prepare, structure or accelerate time-consuming follow-ups."],
    ["Leads mieux qualifiés", "Better-qualified leads"],
    ["Les demandes entrantes peuvent être triées, contextualisées et préparées avant l'échange commercial.", "Incoming requests can be sorted, contextualized and prepared before the sales conversation."],
    ["Onboarding fluidifié", "Smoother onboarding"],
    ["Les informations client, documents et prochaines étapes suivent un chemin plus clair.", "Client information, documents and next steps follow a clearer path."],
    ["Prospection structurée", "Structured prospecting"],
    ["Les listes, angles d'approche et suivis deviennent exploitables au quotidien.", "Lists, outreach angles and follow-ups become usable in daily work."],
    ["Tâches répétitives allégées", "Lighter repetitive work"],
    ["Les opérations à faible valeur sont simplifiées pour libérer du temps utile.", "Low-value operations are simplified to free up useful time."],
    ["Premier pas évident", "A clear first step"],
    ["Le prix est clair, le délai est court, le livrable est concret.", "The price is clear, the timeline is short and the deliverable is tangible."],
    ["Idées d'Agents IA par métier", "AI Agent ideas by industry"],
    ["À quoi pourrait servir votre premier Agent IA ?", "What could your first AI Agent do?"],
    ["Voici des exemples de tâches qui peuvent être étudiées. Ce sont des pistes de conception, pas des résultats clients revendiqués : chaque agent doit être cadré avec vos données, vos règles et votre manière de travailler.", "These are examples of tasks worth exploring. They are design directions, not claimed client outcomes: every agent must be scoped around your data, rules and way of working."],
    ["Commercial B2B", "B2B sales"],
    ["Agent de suivi commercial", "Sales follow-up agent"],
    ["Préparer les relances et qualifier les leads", "Prepare follow-ups and qualify leads"],
    ["Entrée", "Input"],
    ["Notes CRM, emails et informations prospect.", "CRM notes, emails and prospect information."],
    ["L'agent prépare", "The agent prepares"],
    ["Un résumé du contexte, un niveau de priorité et une relance personnalisée.", "A context summary, priority level and personalized follow-up."],
    ["Vous validez", "You approve"],
    ["Le message final et la prochaine action commerciale.", "The final message and the next sales action."],
    ["RH & recrutement", "HR & recruitment"],
    ["Agent de synthèse candidat", "Candidate summary agent"],
    ["Structurer les candidatures et les entretiens", "Structure applications and interviews"],
    ["CV, fiche de poste, notes et transcription.", "Resume, job description, notes and transcript."],
    ["Une synthèse factuelle, les points à approfondir et une trame d'entretien.", "A factual summary, areas to explore and an interview outline."],
    ["L'évaluation humaine et la réponse au candidat.", "The human assessment and response to the candidate."],
    ["Avocat", "Law firm"],
    ["Agent de préqualification", "Prequalification agent"],
    ["Préparer les demandes et structurer les dossiers", "Prepare inquiries and structure case files"],
    ["Formulaire client, pièces transmises et chronologie.", "Client form, submitted documents and timeline."],
    ["Une fiche de dossier, les informations manquantes et une checklist.", "A case summary, missing information and a checklist."],
    ["L'analyse, le conseil et toute décision juridique.", "The analysis, advice and every legal decision."],
    ["Cabinet de conseil", "Consulting firm"],
    ["Agent de production de livrables", "Deliverable production agent"],
    ["Transformer les notes en documents structurés", "Turn notes into structured documents"],
    ["Notes d'audit, réunions, questionnaires et modèles.", "Audit notes, meetings, questionnaires and templates."],
    ["Un compte rendu, une synthèse et un premier plan de recommandations.", "Meeting notes, an executive summary and a first recommendation outline."],
    ["L'analyse, les recommandations et le livrable client.", "The analysis, recommendations and client deliverable."],
    ["Dirigeant de PME", "SMB leader"],
    ["Agent de pilotage hebdomadaire", "Weekly management agent"],
    ["Centraliser les informations et les prochaines actions", "Centralize information and next actions"],
    ["Emails, comptes rendus, chiffres et liste de priorités.", "Emails, meeting notes, figures and priority list."],
    ["Un briefing synthétique, les alertes et les décisions à prendre.", "A concise briefing, alerts and decisions to make."],
    ["Les priorités et les actions confiées à l'équipe.", "Priorities and actions assigned to the team."],
    ["Réseau professionnel", "Professional network"],
    ["Agent de mise en relation", "Introduction agent"],
    ["Orienter les demandes et préparer les connexions", "Route requests and prepare introductions"],
    ["Demande d'un membre, annuaire et critères de mise en relation.", "Member request, directory and matching criteria."],
    ["Une synthèse, des contacts pertinents et un message d'introduction.", "A summary, relevant contacts and an introduction message."],
    ["La pertinence des contacts et l'envoi de l'introduction.", "Contact relevance and sending the introduction."],
    ["Votre métier n'est pas dans la liste ?", "Your industry is not listed?"],
    ["Décrivez une tâche répétitive. Le diagnostic sert précisément à déterminer si elle mérite un agent.", "Describe a repetitive task. The assessment determines whether it is a good candidate for an agent."],
    ["Décrire ma tâche", "Describe my task"],
    ["Voir le cas métier →", "View the industry case →"],
    ["Cas pilote proposé", "Proposed pilot case"],
    ["Entreprise de services", "Service company"],
    ["Agent de préparation de devis", "Proposal preparation agent"],
    ["Une demande reçue. Une proposition prête à valider.", "One inquiry received. One proposal ready for review."],
    ["L'agent transforme un email, un formulaire ou des notes commerciales en proposition structurée. Il repère les informations manquantes et prépare le périmètre, tandis que le dirigeant conserve la validation du prix et des engagements.", "The agent turns an email, form or sales notes into a structured proposal. It identifies missing information and prepares the scope, while the business owner retains approval of pricing and commitments."],
    ["Avant", "Before"],
    ["30 à 60 min", "30 to 60 min"],
    ["pour relire, cadrer, chiffrer et rédiger chaque proposition.", "to review, scope, price and write each proposal."],
    ["Objectif du pilote", "Pilot target"],
    ["10 à 15 min", "10 to 15 min"],
    ["pour contrôler, ajuster et valider une proposition préparée.", "to review, adjust and approve a prepared proposal."],
    ["Demande entrante", "Incoming inquiry"],
    ["Formation IA · équipe commerciale", "AI training · sales team"],
    ["« Nous sommes 18 personnes et souhaitons former notre équipe commerciale à ChatGPT, puis identifier deux tâches à automatiser avant septembre. »", "“We are a team of 18 and want to train our sales team on ChatGPT, then identify two tasks to automate before September.”"],
    ["Besoin identifié", "Identified need"],
    ["Formation commerciale, cas d'usage concrets et échéance définie.", "Sales training, practical use cases and a defined deadline."],
    ["À clarifier", "To clarify"],
    ["Niveau de l'équipe, format, nombre de sessions, outils et confidentialité.", "Team proficiency, format, number of sessions, tools and confidentiality."],
    ["Livrable préparé", "Prepared deliverable"],
    ["Périmètre proposé, questions manquantes, brouillon de proposition et email d'accompagnement.", "Proposed scope, missing questions, proposal draft and accompanying email."],
    ["Ce que l'agent ne décide jamais", "What the agent never decides"],
    ["Le prix et les engagements restent humains.", "Pricing and commitments remain human decisions."],
    ["L'agent prépare une base de travail. Le dirigeant contrôle le tarif, le périmètre, les conditions contractuelles et l'envoi au prospect.", "The agent prepares a working draft. The business owner controls pricing, scope, contractual terms and delivery to the prospect."],
    ["Temps par proposition", "Time per proposal"],
    ["45 min → 10 à 15 min", "45 min → 10 to 15 min"],
    ["Premier retour", "First response"],
    ["Objectif : moins de 4 h", "Target: under 4 hours"],
    ["Demandes incomplètes", "Incomplete inquiries"],
    ["Détection systématique", "Systematic detection"],
    ["Relances oubliées", "Missed follow-ups"],
    ["Objectif : proche de zéro", "Target: close to zero"],
    ["Scénario de démonstration à transformer en véritable étude de cas après un pilote de 30 jours. Les durées affichées sont des objectifs de mesure, pas des résultats clients revendiqués.", "Demonstration scenario to be turned into a genuine case study after a 30-day pilot. The displayed times are measurement targets, not claimed client outcomes."],
    ["Process simple", "Simple process"],
    ["Sous 15 jours ouvrés, votre agent est prêt.", "Your agent is ready in within 15 business days."],
    ["On part d'un besoin clair, on construit vite, on teste sur vos cas concrets, puis on vous remet un agent utilisable sans jargon.", "We start from a clear need, build quickly, test on your real cases and deliver an agent you can use without jargon."],
    ["Cadrer", "Scope"],
    ["On choisit le cas d'usage le plus utile pour votre activité.", "We choose the most useful use case for your business."],
    ["Construire", "Build"],
    ["Je mets en place votre Agent IA autour de ce besoin précis.", "I build your AI Agent around that specific need."],
    ["Tester", "Test"],
    ["On vérifie l'agent sur vos vrais exemples et vos vrais usages.", "We verify the agent using your real examples and workflows."],
    ["Livrer", "Deliver"],
    ["Vous repartez avec votre agent et une prise en main simple.", "You leave with your agent and straightforward onboarding."],
    ["Voir le profil LinkedIn", "View LinkedIn profile"],
    ["Qui est derrière FikolasAI", "Who is behind FikolasAI"],
    ["Un profil hybride : pédagogie, tech, terrain et business.", "A hybrid profile: education, technology, field experience and business."],
    ["Je construis FikolasAI pour aider les professionnels à utiliser l'IA avec discernement. Mon rôle : rendre les concepts simples, relier les outils aux vrais besoins métier, et transformer les idées en agents utilisables.", "I am building FikolasAI to help professionals use AI with sound judgment. My role is to simplify concepts, connect tools to real business needs and turn ideas into usable agents."],
    ["Transmission", "Teaching"],
    ["Mentorat, formation et accompagnement individuel.", "Mentoring, training and individual support."],
    ["Exécution", "Execution"],
    ["Livrables concrets, agents utiles, automatisations testées.", "Practical deliverables, useful agents and tested automations."],
    ["Clarté", "Clarity"],
    ["Prix clair, délai court, résultat concret.", "Clear pricing, short timeline and tangible outcome."],
    ["Commencer simple, puis structurer plus loin.", "Start simple, then build a broader system."],
    ["Présence et travaux publics", "Public work and presence"],
    ["Vérifiez l'approche avant de prendre rendez-vous.", "Review the approach before booking a call."],
    ["Pas de témoignage inventé ni de chiffre client impossible à contrôler. Ces ressources publiques permettent d'évaluer la pédagogie, les sujets traités et la régularité du travail de Cyril.", "No invented testimonials or unverifiable client figures. These public resources let you assess Cyril's teaching style, topics and consistency."],
    ["Parcours et publications", "Background and publications"],
    ["Consultez directement le profil professionnel, les publications et les échanges publics de Cyril Cieslak.", "Review Cyril Cieslak's professional profile, publications and public conversations directly."],
    ["Voir le profil LinkedIn →", "View LinkedIn profile →"],
    ["Conversations IA de terrain", "Practical AI conversations"],
    ["Des échanges publics autour de l'IA appliquée à différents métiers et secteurs. Le contenu est visible avant tout engagement.", "Public conversations about AI applied to different roles and industries. You can review the content before making any commitment."],
    ["Voir la chaîne YouTube →", "View the YouTube channel →"],
    ["IA pour les pros · 15 mini-projets concrets", "AI for professionals · 15 practical mini-projects"],
    ["Un cours public consacré aux usages pratiques de ChatGPT, Gemini et NotebookLM dans le travail quotidien.", "A public course about practical uses of ChatGPT, Gemini and NotebookLM in daily work."],
    ["Consulter le cours Udemy →", "View the Udemy course →"],
    ["Interventions publiques", "Public speaking"],
    ["Conférences et démonstrations", "Talks and demonstrations"],
    ["Retrouvez les formats d'intervention présentés publiquement pour dirigeants, PME et communautés professionnelles.", "Explore public speaking formats for leaders, SMBs and professional communities."],
    ["Voir les interventions →", "View public talks →"],
    ["Ces liens prouvent une présence et une production publiques. Ils ne sont pas présentés comme des témoignages clients ni comme une garantie de résultat.", "These links demonstrate public presence and published work. They are not presented as client testimonials or a guarantee of results."],
    ["Les questions qui reviennent avant de se lancer.", "Common questions before getting started."],
    ["Qu'est-ce que je reçois pour 4 990 € HT ?", "What do I receive for €4,990 excl. VAT?"],
    ["Le forfait comprend le cadrage du cas d'usage, la conception et l'intégration de l'Agent IA, les tests sur vos données, la documentation, la prise en main et 30 jours d'ajustements après livraison.", "The package includes use-case scoping, AI Agent design and integration, testing on your data, documentation, onboarding and 30 days of post-delivery adjustments."],
    ["Est-ce vraiment livré sous 15 jours ouvrés ?", "Is it really delivered in within 15 business days?"],
    ["Oui, lorsque le cas d'usage est cadré et que les accès, données et validations nécessaires sont disponibles. Le délai court à compter du cadrage validé.", "Yes, when the use case is scoped and the required access, data and approvals are available. The delivery period starts once scoping is approved."],
    ["Et après ?", "What happens next?"],
    ["Vous pouvez rester autonome, passer sur l'offre Agent pour optimiser, rejoindre Academy pour monter en compétence, ou évoluer vers Studio.", "You can remain independent, choose Agent for optimization, join Academy to build your skills or move to Studio."],
    ["Dois-je être technique ?", "Do I need technical skills?"],
    ["Non. L'objectif est justement de rendre l'IA utilisable sans jargon, à partir de vos tâches réelles.", "No. The goal is to make AI usable without jargon, starting from your real tasks."],
    ["Votre Agent IA peut être prêt la semaine prochaine.", "Your AI Agent could be ready next week."],
    ["Décrivez votre besoin en 2 minutes. Je vous réponds avec le meilleur cas d'usage pour démarrer vite.", "Describe your need in 2 minutes. I will reply with the best use case for a fast start."],
    ["Ressources IA", "AI resources"],
    ["Guides IA", "AI guides"],
    ["Créer un Agent IA", "Build an AI Agent"],
    ["Formation ChatGPT", "ChatGPT training"],
    ["Qui est Cyril ?", "Who is Cyril?"],
    ["FAQ Agent IA", "AI Agent FAQ"],
    ["Glossaire IA", "AI glossary"],
    ["Nous contacter", "Contact us"]
  ]);

  const translatedNodes = [];
  const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(node.parentElement?.tagName)) continue;
    const french = node.nodeValue.trim();
    const translated = english.get(french);
    if (translated) translatedNodes.push({ node, french, english: translated });
  }

  const translatedAttributes = Array.from(
    document.querySelectorAll('img[alt="Cyril Cieslak, fondateur de FikolasAI"]')
  ).map((element) => ({
    element,
    attribute: "alt",
    french: "Cyril Cieslak, fondateur de FikolasAI",
    english: "Cyril Cieslak, founder of FikolasAI"
  }));

  const toggle = document.getElementById("language-toggle");
  if (!toggle) return;

  function replacePreservingWhitespace(text, replacement) {
    const leading = text.match(/^\s*/)?.[0] || "";
    const trailing = text.match(/\s*$/)?.[0] || "";
    return leading + replacement + trailing;
  }

  function setLanguage(language) {
    const useEnglish = language === "en";
    document.documentElement.lang = useEnglish ? "en" : "fr";

    translatedNodes.forEach((item) => {
      item.node.nodeValue = replacePreservingWhitespace(
        item.node.nodeValue,
        useEnglish ? item.english : item.french
      );
    });

    translatedAttributes.forEach((item) => {
      item.element.setAttribute(item.attribute, useEnglish ? item.english : item.french);
    });

    toggle.textContent = useEnglish ? "FR" : "EN";
    toggle.setAttribute("aria-label", useEnglish ? "Passer en français" : "Switch to English");
    toggle.setAttribute("aria-pressed", String(useEnglish));

    try {
      localStorage.setItem("fikolasai-language", useEnglish ? "en" : "fr");
    } catch (_) {
      // The switch still works when storage is unavailable.
    }
  }

  toggle.addEventListener("click", () => {
    setLanguage(document.documentElement.lang === "en" ? "fr" : "en");
  });

  let savedLanguage = "fr";
  try {
    savedLanguage = localStorage.getItem("fikolasai-language") || "fr";
  } catch (_) {
    savedLanguage = "fr";
  }
  setLanguage(savedLanguage === "en" ? "en" : "fr");
})();

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tally = "https://tally.so/r/2EbyZL?utm_source=fikolasai&utm_medium=website";
const head = (title, description, canonical) => `<!doctype html>
<html lang="fr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${description}">
<link rel="canonical" href="https://fikolasai.com/${canonical}/">
<link rel="stylesheet" href="/assets/seo-static.css"><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<script defer src="/analytics.js?v=20260728-growth1"></script>
</head><body><a class="skip-link" href="#main-content">Aller au contenu principal</a>`;
const nav = `<nav class="border-b border-line bg-ink/90"><div class="max-w-6xl mx-auto px-5 min-h-16 py-3 flex flex-wrap items-center justify-between gap-3"><a href="/" class="font-semibold text-xl">FikolasAI</a><div class="flex flex-wrap items-center gap-3 text-sm"><a href="/demonstration-agent-ia/" class="text-slate-300 hover:text-white">Démonstrations</a><a href="/securite-donnees-agent-ia/" class="text-slate-300 hover:text-white">Sécurité</a><a href="/diagnostic-agent-ia/" class="bg-gold text-slate-950 px-4 py-2 rounded-lg font-bold">Faire le diagnostic</a></div></div></nav>`;
const footer = `<footer class="border-t border-line"><div class="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-5 text-sm text-slate-400"><p><strong class="text-white block mb-2">FikolasAI</strong>Agents IA métier et formations IA pour PME et équipes.</p><a href="/confidentialite/" class="hover:text-white">Confidentialité</a><a href="mailto:cyril.fikolasai@gmail.com" class="hover:text-white">cyril.fikolasai@gmail.com</a></div></footer><script src="/translations.js" defer></script></body></html>`;
const card = "card p-6";
const button = "inline-flex justify-center bg-gold text-slate-950 px-6 py-3 rounded-lg font-bold";

function writePage(slug, html) {
  const directory = path.join(root, slug);
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(path.join(directory, "index.html"), html, "utf8");
}

writePage("diagnostic-agent-ia", `${head(
  "Diagnostic Agent IA gratuit et sans inscription | FikolasAI",
  "Évaluez en deux minutes si une tâche est adaptée à un Agent IA, sans transmettre de donnée à FikolasAI.",
  "diagnostic-agent-ia"
)}${nav}<main id="main-content" tabindex="-1">
<header class="max-w-6xl mx-auto px-5 py-16"><p class="inline-flex rounded-full gold px-4 py-2 text-sm text-amber-100 mb-6">Premier pas sans engagement</p><h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-6 max-w-5xl">Votre tâche mérite-t-elle un Agent IA&nbsp;?</h1><p class="text-xl text-slate-300 max-w-3xl">Répondez à quatre questions. Le calcul s’effectue dans votre navigateur&nbsp;: aucune réponse n’est envoyée ni enregistrée.</p></header>
<section class="max-w-4xl mx-auto px-5 pb-16"><form id="diagnostic" class="card p-6 md:p-9 space-y-6">
<div><label class="block font-semibold mb-2" for="frequency">À quelle fréquence la tâche revient-elle&nbsp;?</label><select id="frequency" class="w-full rounded-lg bg-slate-900 border border-line p-3" required><option value="">Choisir</option><option value="20">Plusieurs fois par jour</option><option value="12">Chaque jour</option><option value="5">Chaque semaine</option><option value="1">Occasionnellement</option></select></div>
<div><label class="block font-semibold mb-2" for="minutes">Combien de minutes prend une occurrence&nbsp;?</label><input id="minutes" type="number" min="1" max="480" inputmode="numeric" class="w-full rounded-lg bg-slate-900 border border-line p-3" required></div>
<div><label class="block font-semibold mb-2" for="rules">Le résultat peut-il être vérifié par une personne&nbsp;?</label><select id="rules" class="w-full rounded-lg bg-slate-900 border border-line p-3" required><option value="">Choisir</option><option value="2">Oui, avec des critères clairs</option><option value="1">Oui, mais les critères restent à formaliser</option><option value="0">Non, la décision est entièrement subjective</option></select></div>
<div><label class="block font-semibold mb-2" for="inputs">Les informations d’entrée sont-elles identifiables&nbsp;?</label><select id="inputs" class="w-full rounded-lg bg-slate-900 border border-line p-3" required><option value="">Choisir</option><option value="2">Oui, dans des outils ou documents connus</option><option value="1">Partiellement</option><option value="0">Non, elles changent constamment</option></select></div>
<div><label class="block font-semibold mb-2" for="hourly">Coût horaire chargé estimé — facultatif</label><input id="hourly" type="number" min="0" max="1000" inputmode="decimal" class="w-full rounded-lg bg-slate-900 border border-line p-3" placeholder="Ex. 45 €"><p class="text-sm text-slate-400 mt-2">Utilisé uniquement pour estimer le coût mensuel actuel de la tâche.</p></div>
<button class="${button}" type="submit">Afficher mon diagnostic</button></form>
<div id="diagnostic-result" class="card gold p-6 md:p-9 mt-6 hidden" role="status" aria-live="polite"></div>
<p class="mt-5 text-sm text-slate-400">Cette estimation aide à préparer un échange. Elle ne constitue ni une étude de faisabilité ni une promesse de gain.</p></section>
<section class="max-w-4xl mx-auto px-5 py-14 border-t border-line"><h2 class="text-3xl font-semibold mb-5">Vous connaissez déjà votre cas d’usage&nbsp;?</h2><p class="text-slate-300 mb-6">Décrivez la tâche, les outils concernés et le résultat attendu. Réponse généralement sous deux jours ouvrés.</p><a class="${button}" href="${tally}&utm_campaign=agent_ia" target="_blank" rel="noopener noreferrer">Décrire mon projet complet</a></section>
</main><script>
document.getElementById("diagnostic").addEventListener("submit",function(event){
 event.preventDefault();
 const frequency=Number(document.getElementById("frequency").value);
 const minutes=Number(document.getElementById("minutes").value);
 const rules=Number(document.getElementById("rules").value);
 const inputs=Number(document.getElementById("inputs").value);
 const hourly=Number(document.getElementById("hourly").value||0);
 const hours=Math.round((frequency*minutes*4.33/60)*10)/10;
 const score=rules+inputs+(frequency>=5?2:frequency>1?1:0);
 const verdict=score>=5?"Bon candidat à étudier":score>=3?"Candidat possible après cadrage":"À cadrer avant d’automatiser";
 const next=score>=5?"Décrivez le processus et trois exemples représentatifs.":score>=3?"Commencez par formaliser les entrées, les règles et la validation humaine.":"Stabilisez d’abord le processus ou choisissez une tâche plus répétitive.";
 const result=document.getElementById("diagnostic-result");
 const cost=hourly>0?" Soit environ "+Math.round(hours*hourly).toLocaleString("fr-FR")+" € de coût de travail mensuel déclaré.":"";
 result.innerHTML="<p class='text-gold font-semibold mb-2'>"+verdict+"</p><h2 class='text-3xl font-semibold mb-4'>Environ "+hours+" h de travail par mois sont associées à cette tâche.</h2><p class='text-slate-200 mb-3'>"+cost+"</p><p class='text-slate-200 mb-5'>"+next+"</p><p class='text-sm text-slate-400'>Il s’agit du volume et du coût actuels déclarés, pas du temps ou de l’argent qui sera nécessairement économisé.</p>";
 result.classList.remove("hidden"); result.focus();
});
</script>${footer}`);

writePage("demonstration-agent-ia", `${head(
  "Démonstrations d’Agents IA métier | FikolasAI",
  "Découvrez trois scénarios démonstratifs d’Agents IA pour PME, RH et ventes B2B, avec entrées, contrôles et sorties.",
  "demonstration-agent-ia"
)}${nav}<main id="main-content" tabindex="-1">
<header class="max-w-6xl mx-auto px-5 py-16"><p class="inline-flex rounded-full gold px-4 py-2 text-sm text-amber-100 mb-6">Voir avant de contacter</p><h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-6">Trois Agents IA, montrés étape par étape.</h1><p class="text-xl text-slate-300 max-w-4xl">Ces démonstrations illustrent la méthode FikolasAI. Elles ne sont ni des témoignages clients ni des résultats garantis.</p></header>
<section class="max-w-6xl mx-auto px-5 pb-16 grid lg:grid-cols-3 gap-5">
<article class="${card}"><p class="text-gold font-semibold">Dirigeant de PME</p><h2 class="text-2xl font-semibold my-3">Synthèse de pilotage</h2><p class="text-slate-300"><strong>Entrées :</strong> notes de réunion, tâches ouvertes, indicateurs.</p><p class="text-slate-300 mt-3"><strong>Traitement :</strong> classement par décision, risque, responsable et échéance.</p><p class="text-slate-300 mt-3"><strong>Sortie :</strong> synthèse hebdomadaire à valider.</p><p class="text-sm text-slate-400 mt-4"><strong>À mesurer :</strong> temps de préparation, oublis détectés, corrections nécessaires.</p></article>
<article class="${card}"><p class="text-gold font-semibold">DRH</p><h2 class="text-2xl font-semibold my-3">Brief candidat</h2><p class="text-slate-300"><strong>Entrées :</strong> CV, fiche de poste et notes autorisées.</p><p class="text-slate-300 mt-3"><strong>Traitement :</strong> extraction factuelle selon une grille définie.</p><p class="text-slate-300 mt-3"><strong>Sortie :</strong> synthèse et questions, sans décision automatisée.</p><p class="text-sm text-slate-400 mt-4"><strong>À mesurer :</strong> temps de préparation, omissions et conformité à la grille.</p></article>
<article class="${card}"><p class="text-gold font-semibold">Direction commerciale</p><h2 class="text-2xl font-semibold my-3">Qualification entrante</h2><p class="text-slate-300"><strong>Entrées :</strong> formulaire, email et règles commerciales.</p><p class="text-slate-300 mt-3"><strong>Traitement :</strong> synthèse, informations manquantes et prochaine action.</p><p class="text-slate-300 mt-3"><strong>Sortie :</strong> fiche prospect et brouillon de réponse à valider.</p><p class="text-sm text-slate-400 mt-4"><strong>À mesurer :</strong> délai de réponse, complétude et corrections du commercial.</p></article></section>
<section class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><div class="grid md:grid-cols-4 gap-4"><div class="${card}"><strong>1. Cadrer</strong><p class="text-sm text-slate-400 mt-2">Une tâche, des entrées et une sortie.</p></div><div class="${card}"><strong>2. Tester</strong><p class="text-sm text-slate-400 mt-2">Des exemples représentatifs et autorisés.</p></div><div class="${card}"><strong>3. Contrôler</strong><p class="text-sm text-slate-400 mt-2">Validation humaine et cas d’erreur.</p></div><div class="${card}"><strong>4. Mesurer</strong><p class="text-sm text-slate-400 mt-2">Temps, qualité, adoption et corrections.</p></div></div></section>
<section class="max-w-4xl mx-auto px-5 py-16 text-center"><h2 class="text-3xl font-semibold mb-5">Quel scénario ressemble à votre entreprise&nbsp;?</h2><div class="flex flex-col sm:flex-row justify-center gap-3"><a class="${button}" href="/diagnostic-agent-ia/">Faire le diagnostic gratuit</a><a class="inline-flex justify-center border border-line px-6 py-3 rounded-lg font-semibold" href="${tally}&utm_campaign=agent_ia" target="_blank" rel="noopener noreferrer">Décrire mon projet</a></div></section>
</main>${footer}`);

writePage("securite-donnees-agent-ia", `${head(
  "Sécurité et données des Agents IA | FikolasAI",
  "Comprendre les principes de traitement des données, de contrôle humain, d’hébergement et de réversibilité d’un projet FikolasAI.",
  "securite-donnees-agent-ia"
)}${nav}<main id="main-content" tabindex="-1">
<header class="max-w-6xl mx-auto px-5 py-16"><p class="inline-flex rounded-full gold px-4 py-2 text-sm text-amber-100 mb-6">Avant toute connexion</p><h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-6">Données, sécurité et contrôle&nbsp;: ce qui est décidé avant le projet.</h1><p class="text-xl text-slate-300 max-w-4xl">Les choix dépendent du cas d’usage et des fournisseurs retenus. Cette page décrit la méthode générale, sans promettre une conformité ou une localisation d’hébergement par défaut.</p></header>
<section class="max-w-6xl mx-auto px-5 pb-16 grid md:grid-cols-2 gap-5">
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Minimisation</h2><p class="text-slate-300">Les données nécessaires, les personnes autorisées et la durée de conservation des copies de travail sont définies avant connexion.</p></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Fournisseurs et hébergement</h2><p class="text-slate-300">Les outils tiers, régions disponibles, conditions et coûts connus sont présentés avant le lancement. Aucune localisation spécifique n’est promise avant sélection.</p></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Validation humaine</h2><p class="text-slate-300">Le niveau de supervision dépend du risque du processus. Les décisions sensibles ne sont pas automatisées par défaut.</p></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Comptes et accès</h2><p class="text-slate-300">Lorsque cela est techniquement possible, les automatisations sont installées sur des comptes client avec des accès limités au projet.</p></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Entraînement des modèles</h2><p class="text-slate-300">Le traitement prévu n’inclut pas l’entraînement d’un modèle appartenant à FikolasAI, sauf accord contraire exprès. Les conditions propres aux outils tiers sont documentées.</p></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-4">Réversibilité</h2><p class="text-slate-300">Les livrables remis, les exports possibles et les limites des plateformes sont définis dans la proposition acceptée.</p></article></section>
<section class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><h2 class="text-3xl font-semibold mb-6">Questions à valider pendant le cadrage</h2><ul class="grid md:grid-cols-2 gap-3 text-slate-200"><li class="${card}">Quelles données sont réellement nécessaires&nbsp;?</li><li class="${card}">Quels fournisseurs peuvent les traiter&nbsp;?</li><li class="${card}">Qui valide les sorties et les exceptions&nbsp;?</li><li class="${card}">Combien de temps les copies de travail sont-elles conservées&nbsp;?</li><li class="${card}">Quels journaux et contrôles sont disponibles&nbsp;?</li><li class="${card}">Quels éléments doivent être remis en cas d’arrêt&nbsp;?</li></ul></section>
<section class="max-w-4xl mx-auto px-5 py-16 text-center"><h2 class="text-3xl font-semibold mb-5">Vous avez une contrainte DSI, DPO ou achats&nbsp;?</h2><p class="text-slate-300 mb-6">Indiquez-la dès la qualification afin de vérifier la faisabilité avant toute proposition.</p><a class="${button}" href="${tally}&utm_campaign=agent_ia" target="_blank" rel="noopener noreferrer">Décrire mes contraintes</a></section>
</main>${footer}`);

writePage("pilote-ia-entreprise", `${head(
  "Cadrer un pilote IA en entreprise | FikolasAI",
  "Méthode de cadrage d’un pilote IA pour responsables innovation : cas d’usage, gouvernance, métriques, sécurité et passage à l’échelle.",
  "pilote-ia-entreprise"
)}${nav}<main id="main-content" tabindex="-1">
<header class="max-w-6xl mx-auto px-5 py-16"><p class="inline-flex rounded-full gold px-4 py-2 text-sm text-amber-100 mb-6">Responsables innovation · DSI · métiers</p><h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-6">Un pilote IA défendable devant les métiers, la DSI et les achats.</h1><p class="text-xl text-slate-300 max-w-4xl">Un cas d’usage limité, des critères de réussite mesurables, des responsabilités explicites et une décision documentée avant toute extension.</p><div class="mt-8 flex flex-col sm:flex-row gap-3"><a class="${button}" href="${tally}&utm_campaign=innovation_ia" target="_blank" rel="noopener noreferrer">Cadrer mon pilote IA</a><a class="inline-flex justify-center border border-line px-6 py-3 rounded-lg font-semibold" href="/securite-donnees-agent-ia/">Examiner sécurité et données</a></div></header>
<section class="max-w-6xl mx-auto px-5 pb-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Cas d’usage</h2><p class="text-slate-300">Fréquence, irritant, utilisateurs, entrées, sortie vérifiable et propriétaire métier.</p></article>
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Architecture</h2><p class="text-slate-300">Sources, comptes, API disponibles, fournisseurs possibles et limites techniques.</p></article>
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Gouvernance</h2><p class="text-slate-300">Responsable, droits d’accès, validation humaine, incidents et décision de mise en production.</p></article>
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Évaluation</h2><p class="text-slate-300">Jeu de tests, qualité attendue, erreurs critiques, temps de traitement et adoption.</p></article>
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Réversibilité</h2><p class="text-slate-300">Livrables, dépendances tierces, possibilités d’export et conditions de transfert.</p></article>
<article class="${card}"><h2 class="text-xl font-semibold mb-3">Décision</h2><p class="text-slate-300">Étendre, corriger, maintenir le pilote ou arrêter selon les indicateurs définis.</p></article></section>
<section class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><h2 class="text-3xl font-semibold mb-6">Livrables à définir dans la proposition</h2><div class="grid md:grid-cols-2 gap-4 text-slate-300"><p class="${card}">Périmètre, hypothèses et exclusions</p><p class="${card}">Schéma des flux et fournisseurs retenus</p><p class="${card}">Scénarios de test et critères d’acceptation</p><p class="${card}">Documentation d’usage et de supervision</p><p class="${card}">Mesures avant/après et rapport de pilote</p><p class="${card}">Conditions de maintenance et de réversibilité</p></div><p class="text-sm text-slate-400 mt-5">Le contenu exact dépend du projet et n’est contractuel que lorsqu’il figure dans la proposition acceptée.</p></section>
</main>${footer}`);

writePage("programme-formation-ia-dirigeants", `${head(
  "Programme de formation IA pour dirigeants | FikolasAI",
  "Programme indicatif de formation ChatGPT et IA pour dirigeants : objectifs, modules, formats, livrables et modalités.",
  "programme-formation-ia-dirigeants"
)}${nav}<main id="main-content" tabindex="-1">
<header class="max-w-6xl mx-auto px-5 py-16"><p class="inline-flex rounded-full gold px-4 py-2 text-sm text-amber-100 mb-6">Fiche programme indicative</p><h1 class="text-4xl md:text-6xl font-semibold leading-tight mb-6">Formation IA pour dirigeants&nbsp;: comprendre, décider et agir.</h1><p class="text-xl text-slate-300 max-w-4xl">Le programme final, la durée, le nombre de participants, le format, l’évaluation et le tarif sont adaptés au besoin puis précisés dans le devis.</p></header>
<section class="max-w-6xl mx-auto px-5 pb-16 grid lg:grid-cols-[1.4fr_.6fr] gap-6"><div class="space-y-4">
<article class="${card}"><h2 class="text-2xl font-semibold mb-3">Objectifs</h2><ul class="space-y-2 text-slate-300"><li>Identifier les usages pertinents et leurs limites.</li><li>Formuler des consignes réutilisables.</li><li>Vérifier les réponses et citer les sources lorsque nécessaire.</li><li>Définir les informations à ne pas partager.</li><li>Prioriser un plan d’action adapté à l’entreprise.</li></ul></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-3">Modules indicatifs</h2><ol class="space-y-3 text-slate-300"><li><strong>1.</strong> Possibilités, limites et vocabulaire utile</li><li><strong>2.</strong> Recherche, synthèse, réunion et communication</li><li><strong>3.</strong> Méthode de prompt et vérification</li><li><strong>4.</strong> Confidentialité, règles internes et supervision</li><li><strong>5.</strong> Sélection d’un premier cas d’usage</li></ol></article>
<article class="${card}"><h2 class="text-2xl font-semibold mb-3">Évaluation et livrables</h2><p class="text-slate-300">Exercices sur des situations métier, vérification des productions et plan d’action. Les supports, modèles de consignes et modalités d’évaluation sont précisés dans la proposition.</p></article></div>
<aside class="card gold p-7 h-fit"><h2 class="text-2xl font-semibold mb-4">Modalités à définir</h2><dl class="space-y-4 text-slate-300"><div><dt class="font-semibold text-white">Public</dt><dd>Dirigeants, CODIR, entrepreneurs</dd></div><div><dt class="font-semibold text-white">Format</dt><dd>À distance ou en présentiel selon la proposition</dd></div><div><dt class="font-semibold text-white">Prérequis</dt><dd>Aucun prérequis technique par défaut</dd></div><div><dt class="font-semibold text-white">Durée et groupe</dt><dd>Selon objectifs et niveau initial</dd></div><div><dt class="font-semibold text-white">Tarif</dt><dd>Sur devis après qualification</dd></div></dl><a class="${button} mt-6" href="${tally}&utm_campaign=formation_ia" target="_blank" rel="noopener noreferrer">Recevoir un programme adapté</a></aside></section>
</main>${footer}`);

function replaceIn(file, from, to) {
  const full = path.join(root, file);
  const before = fs.readFileSync(full, "utf8");
  if (!before.includes(from)) return false;
  fs.writeFileSync(full, before.replace(from, to), "utf8");
  return true;
}

const homeInsertion = `<section id="prospect-paths" class="max-w-7xl mx-auto px-5 sm:px-6 py-16 border-t border-white/10">
<div class="max-w-3xl mb-9"><p class="text-gold font-semibold mb-3">Choisissez votre prochain pas</p><h2 class="text-3xl md:text-5xl font-semibold mb-4">Vous n’avez pas besoin d’être prêt à acheter pour avancer.</h2><p class="text-slate-400">Explorez une démonstration, estimez la valeur d’une tâche ou préparez directement un projet déjà cadré.</p></div>
<div class="grid md:grid-cols-3 gap-5">
<a href="/diagnostic-agent-ia/" class="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-7 hover:bg-emerald-400/15 transition"><p class="text-sm text-emerald-200 mb-2">2 minutes · aucune donnée envoyée</p><h3 class="text-2xl font-semibold mb-3">Faire le diagnostic</h3><p class="text-slate-300">Vérifiez si votre tâche est un bon candidat et estimez son volume mensuel.</p></a>
<a href="/demonstration-agent-ia/" class="rounded-2xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition"><p class="text-sm text-gold mb-2">PME · RH · ventes</p><h3 class="text-2xl font-semibold mb-3">Voir les démonstrations</h3><p class="text-slate-300">Découvrez les entrées, le traitement, les sorties et les contrôles humains.</p></a>
<a href="${tally}&amp;utm_campaign=agent_ia" target="_blank" rel="noopener noreferrer" class="rounded-2xl border border-gold/40 bg-gold/10 p-7 hover:bg-gold/15 transition"><p class="text-sm text-gold mb-2">Projet déjà identifié</p><h3 class="text-2xl font-semibold mb-3">Demander une étude</h3><p class="text-slate-300">Décrivez le processus, les outils et le résultat attendu pour préparer un échange.</p></a>
</div></section>`;

if (!fs.readFileSync(path.join(root, "index.html"), "utf8").includes('id="prospect-paths"')) {
  replaceIn("index.html", '<section id="adequation"', `${homeInsertion}<section id="adequation"`);
}
replaceIn("index.html", '<a href="#donnees" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Données</a>', '<a href="/securite-donnees-agent-ia/" class="rounded-lg border border-white/10 bg-white/5 px-4 py-2">Sécurité & données</a>');
replaceIn("index.html", '<a href="/formation-chatgpt-dirigeants/" class="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"><strong class="block text-white">Responsable formation</strong>', '<a href="/programme-formation-ia-dirigeants/" class="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"><strong class="block text-white">Responsable formation</strong>');

const personaChanges = [
  ["agent-ia-dirigeant-pme/index.html", "Décrire mon projet d’Agent IA", "Évaluer ma tâche de dirigeant"],
  ["agent-ia-rh/index.html", "Décrire mon projet d’Agent IA", "Évaluer un cas d’usage RH"],
  ["sales-b2b-agent-ia/index.html", "Décrire mon projet d’Agent IA", "Auditer une friction commerciale"]
];
for (const [file, from, to] of personaChanges) {
  const full = path.join(root, file);
  const before = fs.readFileSync(full, "utf8");
  fs.writeFileSync(full, before.replaceAll(from, to), "utf8");
}

if (!fs.readFileSync(path.join(root, "formation-chatgpt-dirigeants/index.html"), "utf8").includes("Une fiche exploitable pour préparer votre demande.")) {
  replaceIn("formation-chatgpt-dirigeants/index.html", '<section id="faq"', `<section id="training-program-path" class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><div class="grid md:grid-cols-2 gap-5"><div class="card p-7"><p class="text-gold font-semibold mb-2">Responsable formation</p><h2 class="text-3xl font-semibold mb-4">Une fiche exploitable pour préparer votre demande.</h2><p class="text-slate-300 mb-5">Consultez les objectifs, modules, livrables et modalités à définir avant de demander un devis.</p><a href="/programme-formation-ia-dirigeants/" class="${button}">Voir le programme indicatif</a></div><div class="card p-7"><p class="text-gold font-semibold mb-2">Besoin sur mesure</p><h2 class="text-3xl font-semibold mb-4">Public, durée et format sont cadrés avant devis.</h2><p class="text-slate-300">Aucun nombre de participants, financement ou certification n’est affirmé sans validation préalable.</p></div></div></section><section id="faq"`);
}

if (!fs.readFileSync(path.join(root, "solutions-ia-metiers/index.html"), "utf8").includes("Responsables innovation et transformation")) {
  replaceIn("solutions-ia-metiers/index.html", '<section class="max-w-6xl mx-auto px-5 py-16"><div class="card gold', `<section id="innovation-path" class="max-w-6xl mx-auto px-5 py-14 border-t border-line"><h2 class="text-3xl md:text-5xl font-semibold mb-4">Responsables innovation et transformation</h2><p class="text-slate-400 text-lg mb-8">Cadrez un pilote avec critères d’évaluation, gouvernance, sécurité et décision de passage à l’échelle.</p><a class="directory-link" href="/pilote-ia-entreprise/"><strong class="text-amber-200">Cadrer un pilote IA en entreprise</strong><span class="block text-slate-400 mt-2">Cas d’usage, architecture, tests, responsabilités et réversibilité.</span></a></section><section class="max-w-6xl mx-auto px-5 py-16"><div class="card gold`);
}

const sitemapPath = path.join(root, "sitemap.xml");
let sitemap = fs.readFileSync(sitemapPath, "utf8");
for (const slug of ["diagnostic-agent-ia", "demonstration-agent-ia", "securite-donnees-agent-ia", "pilote-ia-entreprise", "programme-formation-ia-dirigeants"]) {
  if (!sitemap.includes(`/${slug}/`)) {
    sitemap = sitemap.replace("</urlset>", `<url><loc>https://fikolasai.com/${slug}/</loc><lastmod>2026-07-28</lastmod></url>\n</urlset>`);
  }
}
fs.writeFileSync(sitemapPath, sitemap, "utf8");

console.log("Prospect conversion improvements applied.");

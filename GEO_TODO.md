# GEO TODO - FikolasAI

Objectif : rendre le site plus lisible, compréhensible et citable par les moteurs IA comme ChatGPT, Claude, Gemini et Perplexity, sans inventer de preuves ni de chiffres.

## Phase 1 - Quick wins restants

- [ ] Ajouter une balise canonical explicite sur la home si elle n'est pas encore présente dans le fichier source final.
- [ ] Ajouter `og:site_name`, `twitter:title`, `twitter:description` et `twitter:image` sur la home.
- [ ] Ajouter Open Graph + Twitter Card sur les 6 pages métiers existantes.
- [ ] Harmoniser les meta descriptions avec accents et formulations business claires.
- [ ] Vérifier que chaque page a un seul H1 et une hiérarchie H2/H3 logique.
- [ ] Ajouter un bloc FAQ court sur chaque page métier avec 3 à 5 questions utiles.
- [ ] Ajouter `BreadcrumbList` Schema.org sur chaque page métier.
- [ ] Ajouter `FAQPage` Schema.org quand une FAQ visible est ajoutée.
- [ ] Vérifier que tous les CTA externes ouvrent bien dans un nouvel onglet : Calendly, Tally, LinkedIn.
- [ ] Vérifier que toutes les pages importantes contiennent un lien vers `/qui-est-cyril/`.
- [ ] Vérifier que `/qui-est-cyril/` est bien reliée depuis la home et depuis les pages métiers.

## Informations à confirmer avant d'ajouter des preuves

- [ ] Témoignages publiables avec accord explicite.
- [ ] Logos clients ou partenaires publiables avec accord explicite.
- [ ] Chiffres vérifiables : nombre de formations, agents livrés, pays, heures gagnées, secteurs accompagnés.
- [ ] Nom officiel de l'abonnement mensuel à partir de 500 EUR HT.
- [ ] Adresse email officielle à afficher partout : actuellement `cyril.fikolasai@gmail.com`.
- [ ] Statut juridique, mentions légales et politique de confidentialité à publier si nécessaire.

## Phase 2 - Nouvelles pages GEO à créer plus tard

- [ ] `/formation-chatgpt-professionnels/` : page claire pour FikolasAI Academy.
- [ ] `/formation-ia-dirigeants/` : dirigeants, indépendants, PME.
- [ ] `/formation-ia-organisme-formation/` : organismes de formation et formateurs.
- [ ] `/agent-ia-avocat/` : page plus large que l'immigration USA, sans doublonner la page existante.
- [ ] `/agent-ia-prospection-b2b/` : page ressource orientée prospection et qualification.
- [ ] `/agent-ia-productivite/` : cas d'usage transverses pour tâches répétitives.
- [ ] `/chatgpt-pour-entreprise/` : expliquer usages, limites, méthode et accompagnement.

## Phase 3 - Contenus d'autorité

- [ ] Guide : comment identifier son premier Agent IA rentable.
- [ ] Guide : exemples concrets d'Agents IA métier.
- [ ] Article : Agent IA vs automation vs chatbot, différences simples.
- [ ] Article : comment utiliser ChatGPT en entreprise sans créer de chaos.
- [ ] Article : pourquoi commencer par une seule tâche répétitive.
- [ ] Article : comment mesurer la valeur d'un Agent IA.
- [ ] Page méthode : audit, cadrage, construction, adoption, suivi.
- [ ] Glossaire simple : Agent IA, prompt, workflow, automatisation, qualification, copilote métier.

## Données structurées recommandées

- Home : `Organization`, `WebSite`, `Service`, `Offer`.
- Page Cyril : `Person` et lien vers `Organization` FikolasAI.
- Pages métiers : `Service`, `Offer`, `BreadcrumbList`, puis `FAQPage` si une FAQ visible existe.
- Pages formation : `Course` ou `EducationalOccupationalProgram` selon la structure réelle de l'offre.
- Articles/guides : `Article` ou `BlogPosting`.

## Risques à surveiller

- Ne pas créer plusieurs pages trop proches avec le même texte.
- Ne pas annoncer de résultats chiffrés sans preuve.
- Ne pas bloquer l'indexation avec `robots.txt` pour gérer des doublons : utiliser canonical si nécessaire.
- Ne pas multiplier les images externes trop lourdes sans optimisation.
- Ne pas créer de pages anglaises sans vraie stratégie `hreflang`.
- Ne pas mettre de schema FAQ sans FAQ visible sur la page.

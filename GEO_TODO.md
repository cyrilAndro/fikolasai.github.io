# GEO TODO - FikolasAI

Objectif : rendre le site plus lisible, compréhensible et citable par les moteurs IA comme ChatGPT, Claude, Gemini et Perplexity, sans inventer de preuves ni de chiffres.

## Déjà mis en place

- [x] Home reliée à `/ressources-ia/`, `/guides-ia/` et `/qui-est-cyril/`.
- [x] Pages ressources et guides reliées aux pages de référence IA.
- [x] Pages d'autorité créées : définition Agent IA métier, FAQ Agent IA, glossaire IA business.
- [x] `sitemap.xml` enrichi avec les pages GEO importantes.
- [x] `robots.txt` propre avec sitemap et indication `llms.txt`.
- [x] `llms.txt` ajouté à la racine pour donner aux moteurs IA une carte lisible du site.
- [x] Lien `llms.txt` ajouté dans les pages HTML importantes.
- [x] Schema.org ajouté sur la home : `Organization`, `Person`, `Service`, `Offer`, `WebSite`.
- [x] Schema.org ajouté sur les pages d'autorité : `FAQPage`, `Article`, `DefinedTermSet`.

## Phase 1 - Quick wins restants

- [ ] Ajouter `og:site_name`, `twitter:title`, `twitter:description` et `twitter:image` sur toutes les pages qui n'en disposent pas encore.
- [ ] Ajouter Open Graph + Twitter Card sur les 6 pages métiers existantes si une page en manque.
- [ ] Vérifier que chaque page a un seul H1 et une hiérarchie H2/H3 logique.
- [ ] Ajouter un bloc FAQ court sur chaque page métier avec 3 à 5 questions utiles.
- [ ] Ajouter `BreadcrumbList` Schema.org sur chaque page métier.
- [ ] Ajouter `FAQPage` Schema.org quand une FAQ visible est ajoutée.
- [ ] Vérifier que tous les CTA externes ouvrent bien dans un nouvel onglet : Calendly, Tally, LinkedIn.
- [ ] Vérifier que toutes les pages importantes contiennent un lien vers `/qui-est-cyril/`.

## Informations à confirmer avant d'ajouter des preuves

- [ ] Témoignages publiables avec accord explicite.
- [ ] Logos clients ou partenaires publiables avec accord explicite.
- [ ] Chiffres vérifiables : nombre de formations, agents livrés, pays, heures gagnées, secteurs accompagnés.
- [ ] Nom officiel de l'abonnement mensuel à partir de 500 EUR HT.
- [ ] Adresse email officielle à afficher partout : actuellement `cyril.fikolasai@gmail.com`.
- [ ] Statut juridique, mentions légales et politique de confidentialité à publier si nécessaire.

## Phase 2 - Pages GEO créées

- [x] `/formation-chatgpt-professionnels/` : page claire pour FikolasAI Academy.
- [x] `/formation-ia-dirigeants/` : dirigeants, indépendants, PME.
- [x] `/formation-ia-organisme-formation/` : organismes de formation et formateurs.
- [x] `/agent-ia-avocat/` : page plus large que l'immigration USA, sans doublonner la page existante.
- [x] `/agent-ia-prospection-b2b/` : page ressource orientée prospection et qualification.
- [x] `/agent-ia-productivite/` : cas d'usage transverses pour tâches répétitives.
- [x] `/chatgpt-pour-entreprise/` : expliquer usages, limites, méthode et accompagnement.

## Phase 3 - Contenus d'autorité créés

- [x] Guide : comment identifier son premier Agent IA rentable.
- [x] Guide : exemples concrets d'Agents IA métier.
- [x] Article : Agent IA vs automation vs chatbot, différences simples.
- [x] Article : comment utiliser ChatGPT en entreprise sans créer de chaos.
- [x] Article : comment mesurer la valeur d'un Agent IA.
- [x] Page méthode : audit, cadrage, construction, adoption, suivi.
- [x] Glossaire simple : Agent IA, prompt, workflow, automatisation, qualification, copilote métier.
- [x] FAQ : prix, délai, suivi, abonnement et fonctionnement d'un Agent IA FikolasAI.
- [x] Définition citable : Agent IA métier.

## Prochain palier pour aller encore plus loin

- [ ] Ajouter des FAQ visibles et spécifiques sur les 6 pages métiers verticales.
- [ ] Ajouter des liens contextuels depuis chaque page métier vers la FAQ, le glossaire et la définition Agent IA métier.
- [ ] Ajouter des mini études de cas publiables uniquement quand les preuves et autorisations sont disponibles.
- [ ] Créer une page mentions légales et confidentialité si nécessaire.
- [ ] Ajouter un vrai système `hreflang` seulement si une stratégie de pages anglaises dédiées est validée.

## Données structurées recommandées

- Home : `Organization`, `WebSite`, `Service`, `Offer` - fait.
- Page Cyril : `Person` et lien vers `Organization` FikolasAI - à vérifier / renforcer si besoin.
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

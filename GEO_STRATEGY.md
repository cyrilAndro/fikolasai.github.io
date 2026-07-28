# Stratégie GEO FikolasAI

Date de l’audit : 28 juillet 2026  
Périmètre : 87 pages HTML après création de la page pilier GEO

## 1. Objectif

Augmenter la probabilité que les contenus FikolasAI soient découverts, compris et cités dans les réponses de ChatGPT, Claude, Gemini, Microsoft Copilot et Perplexity, sans créer de contenu destiné à manipuler un modèle ni revendiquer de preuve inexistante.

Le GEO complète le SEO. Aucun fichier ou balisage ne garantit une citation. Les leviers prioritaires restent :

1. l’indexabilité ;
2. la précision factuelle ;
3. une réponse directement accessible dans le HTML ;
4. des pages spécialisées reliées entre elles ;
5. des affirmations étayées par des sources vérifiables ;
6. une mise à jour régulière.

## 2. Informations réutilisables identifiées

### Entité et expertise

- identité de FikolasAI et de Cyril Cieslak ;
- positionnement : formation IA, ChatGPT et Agents IA métier ;
- plus de 4 000 heures de formation déclarées ;
- présence publique : LinkedIn, YouTube, Udemy, AI Monthly et interventions ;
- référence publique FACC Atlanta.

Pages sources : `/qui-est-cyril/`, `/contenus-ia/`, `/ai-monthly/`, `/interventions-ia/`.

### Définitions et comparaisons

- définition d’un Agent IA métier ;
- Agent IA contre chatbot et automatisation ;
- choix entre formation ChatGPT et Agent IA ;
- méthode de sélection d’un premier cas d’usage ;
- critères d’un pilote IA.

Pages sources : `/definition-agent-ia-metier/`, `/agent-ia-vs-chatbot-automation/`, `/formation-chatgpt-vs-agent-ia/`, `/guide-premier-agent-ia-rentable/`, `/pilote-ia-entreprise/`.

### Questions commerciales

- prix de départ de l’offre Agent IA ;
- délai cible et conditions de départ ;
- livrables possibles ;
- coûts tiers et services optionnels ;
- supervision humaine ;
- données, hébergement et réversibilité.

Pages sources : accueil, `/faq-agent-ia/`, `/securite-donnees-agent-ia/`, `/methode-fikolasai-agent-ia/`.

### Cas d’usage

- dirigeant de PME ;
- ressources humaines ;
- ventes B2B ;
- cabinets de conseil et professions juridiques ;
- chambres de commerce et réseaux professionnels ;
- formation et accompagnement par public.

Pages sources : pages `agent-ia-*`, `/sales-b2b-agent-ia/`, `/solutions-ia-metiers/` et pages de formation.

### Réponses pédagogiques

- utiliser ChatGPT en entreprise ;
- former ses salariés à l’IA ;
- gagner du temps avec ChatGPT ;
- choisir entre ChatGPT, Perplexity et NotebookLM ;
- mesurer la valeur d’un Agent IA ;
- utiliser l’IA sans créer de chaos organisationnel.

Pages sources : dossier `/questions/`, `/mesurer-valeur-agent-ia/` et `/chatgpt-entreprise-sans-chaos/`.

## 3. Architecture GEO mise en place

### Niveau 1 — source synthétique

- `/llms.txt` : carte concise du site conforme au format proposé par llmstxt.org ;
- `/llms-full.txt` : contexte étendu, réponses courtes et règles de citation ;
- `/ai.txt` : manifeste complémentaire clairement présenté comme non standard ;
- `/sitemap.xml` : source canonique de découverte des URL ;
- `/robots.txt` : accès explicite pour OAI-SearchBot, PerplexityBot et Google-Extended.

### Niveau 2 — page pilier citable

`/reponses-ia-entreprise/` centralise 20 réponses courtes :

- une question par titre ;
- une réponse autonome et prudente ;
- vocabulaire stable ;
- absence de superlatifs ;
- distinctions entre fait, objectif et condition contractuelle ;
- liens vers les pages approfondies.

### Niveau 3 — pages de référence

- définition ;
- FAQ ;
- glossaire ;
- méthode ;
- sécurité et données ;
- démonstrations ;
- pilote IA ;
- programme de formation ;
- profils métier.

### Niveau 4 — preuves

Les pages d’autorité renvoient vers les sources publiques. Les démonstrations sont étiquetées comme scénarios et ne sont pas transformées en études de cas clients.

## 4. Données structurées

### Ajouts

- `WebPage` et `BreadcrumbList` sur les cinq nouvelles pages CRO ;
- `WebPage`, `BreadcrumbList` et `FAQPage` sur la page pilier ;
- `dateModified` sur les nouvelles pages de référence ;
- lien `<link rel="alternate" type="text/plain">` vers `llms.txt` sur toutes les pages HTML.

### Règles appliquées

- le JSON-LD décrit uniquement du contenu visible ;
- aucune note, évaluation, certification, avis ou résultat client n’est inventé ;
- `FAQPage` n’est pas ajouté mécaniquement à toutes les pages ;
- le balisage ne remplace pas les contenus visibles ;
- aucune propriété Schema.org spéculative n’est utilisée.

Google indique que les résultats enrichis FAQ sont désormais principalement réservés aux sites gouvernementaux et de santé. Le balisage FAQ est conservé ici pour la clarté sémantique, sans attendre un affichage enrichi.

## 5. Stratégie par moteur IA

### ChatGPT

- autoriser `OAI-SearchBot` ;
- maintenir des pages publiques indexables et des réponses autonomes ;
- citer la page la plus spécialisée ;
- surveiller les liens et citations provenant de ChatGPT lorsque les données sont disponibles.

### Claude

- conserver un HTML lisible sans dépendance au rendu JavaScript ;
- fournir des réponses structurées, définitions et limites ;
- maintenir des sources publiques vérifiables ;
- ne pas confondre visibilité dans Claude et autorisation d’entraînement.

### Gemini

- suivre les fondamentaux Google Search ;
- rendre les pages indexables, canoniques, rapides et structurées ;
- réduire les doublons ;
- conserver `Google-Extended` accessible selon la politique éditoriale choisie.

### Microsoft Copilot

- garantir l’indexation Bing ;
- utiliser Schema.org, JSON-LD, Open Graph et sitemap ;
- suivre dans Bing Webmaster Tools les pages citées, requêtes de grounding et tendances de citation.

### Perplexity

- autoriser `PerplexityBot` ;
- fournir des réponses courtes avec une URL canonique précise ;
- renforcer les liens vers les sources externes vérifiables ;
- surveiller les pages citées et corriger rapidement les affirmations obsolètes.

## 6. Contenus à ne pas créer sans preuve

- classement comme « meilleur expert » ;
- logos ou témoignages clients non autorisés ;
- économies ou taux de conversion non mesurés ;
- certification non documentée ;
- conformité RGPD générale ;
- compatibilité avec un logiciel non testée ;
- garantie de délai, résultat, disponibilité ou remboursement ;
- localisation d’hébergement non sélectionnée.

## 7. Mesure

### Indicateurs mensuels

- pages citées dans Bing AI Performance ;
- requêtes et thèmes associés aux citations ;
- trafic référent depuis ChatGPT, Perplexity, Copilot et autres assistants ;
- impressions et clics des pages piliers dans Search Console ;
- nombre de pages indexées ;
- conversions assistées depuis les pages de référence ;
- erreurs de données structurées ;
- mentions incorrectes détectées dans les réponses des assistants.

### Requêtes tests

- « Qu’est-ce qu’un Agent IA métier ? »
- « Comment choisir un premier Agent IA pour une PME ? »
- « Combien coûte un Agent IA pour une PME ? »
- « Comment sécuriser les données d’un Agent IA ? »
- « Formation ChatGPT pour dirigeants francophones »
- « Formateur IA francophone pour PME »
- « Agent IA pour équipe commerciale B2B »
- « Comment mesurer la valeur d’un Agent IA ? »

Les résultats doivent être observés dans le temps. Une présence ou une absence ponctuelle n’est pas une mesure fiable.

## 8. Maintenance

À chaque modification commerciale :

1. mettre à jour la page concernée ;
2. mettre à jour `llms.txt`, `llms-full.txt` et `ai.txt` ;
3. vérifier la page pilier ;
4. valider le JSON-LD ;
5. actualiser `dateModified` ;
6. soumettre l’URL à Search Console et, si utilisé, à IndexNow ;
7. contrôler les citations après réindexation.

Le script `scripts/apply-geo-strategy.js` rend cette couche reproductible.

## 9. Limites

`llms.txt` est une proposition de standard, pas un facteur de classement garanti. `ai.txt` ne constitue pas un standard reconnu. La valeur principale de ces fichiers est la cohérence éditoriale et la mise à disposition d’un inventaire clair ; ils ne remplacent ni l’indexation, ni l’autorité, ni la qualité du contenu.

## 10. Sources de cadrage

- Google Search Central, optimisation pour les fonctionnalités d’IA générative : https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google Search Central, introduction aux données structurées : https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central, évolution des résultats FAQ et HowTo : https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Bing Webmaster Tools, AI Performance : https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Bing Webmaster Tools, données structurées : https://www.bing.com/webmasters/help/marking-up-your-site-with-structured-data-3a93e731
- OpenAI, FAQ éditeurs et développeurs : https://help.openai.com/en/articles/12627856-publishers-and-developers-faq
- Perplexity, documentation de ses crawlers : https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Proposition `llms.txt` : https://llmstxt.org/

## 11. Renforcement GEO v2 — 28 juillet 2026

Cette deuxième passe part d’un principe simple : une page doit d’abord être utile à un décideur humain. La citation par un assistant est un bénéfice secondaire ; aucune présence dans une réponse générative n’est garantie.

### Inventaire traité

- 87 pages HTML analysées ;
- métadonnées sociales complétées sur les pages indexables ;
- cohérence contrôlée entre les FAQ visibles et leur balisage `FAQPage` ;
- six pages piliers enrichies avec une réponse courte, des critères de décision, des limites et une date de mise à jour ;
- trois pages d’autorité reliées entre elles : définition, glossaire et FAQ ;
- page `/reponses-ia-entreprise/` complétée par des sources primaires officielles.

### Pages piliers renforcées

1. `/methode-fikolasai-agent-ia/`
2. `/mesurer-valeur-agent-ia/`
3. `/exemples-agents-ia-metier/`
4. `/agent-ia-vs-chatbot-automation/`
5. `/chatgpt-entreprise-sans-chaos/`
6. `/guide-premier-agent-ia-rentable/`

Chaque ajout répond à une intention précise : définition, comparaison, sélection d’un cas d’usage, méthode, mesure ou gouvernance. Les formulations évitent les garanties de résultat et distinguent les principes généraux des engagements contractuels.

### Règles éditoriales

- placer la réponse directe au début du bloc concerné ;
- utiliser une question ou une intention par section ;
- préférer des phrases autonomes qui restent compréhensibles hors contexte ;
- citer une source primaire pour les affirmations externes importantes ;
- dater les contenus susceptibles d’évoluer ;
- maintenir les informations commerciales dans une source canonique unique ;
- ne pas multiplier des pages quasi identiques pour couvrir des variantes de mots-clés.

### Ordre de mise à jour

En cas de divergence, utiliser cet ordre de confiance :

1. page canonique actuelle ;
2. proposition commerciale ou contrat accepté ;
3. page spécialisée actuelle ;
4. `llms-full.txt` ;
5. extrait ancien conservé par un moteur.

Le script `scripts/apply-geo-v2.js` applique les enrichissements de cette passe. Le script `scripts/verify-geo-v2.js` contrôle les métadonnées, le JSON-LD, la concordance des FAQ visibles, les pages piliers et les fichiers destinés aux assistants.

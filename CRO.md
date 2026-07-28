# Audit CRO — statut final des 20 freins

Audit réalisé dans la perspective d’un dirigeant de PME découvrant FikolasAI. Les formulations restent prudentes lorsqu’un point contractuel ou commercial n’est pas validé.

## 1. CTA et action réelle désalignés

- **Problème initial :** le CTA promettait une vérification d’éligibilité que le formulaire ne produisait pas.
- **Solution appliquée :** CTA Agent normalisé sur « Décrire mon projet d’Agent IA » / “Describe my AI Agent project”, formulaire qualifiant et délai de réponse explicite.
- **Fichiers :** pages HTML Agent, `index.html`, `en/index.html`, `scripts/apply-growth-positioning.js`, formulaire Tally `2EbyZL`.
- **Risque restant :** faible ; le diagnostic final reste humain.
- **Test :** recherche automatisée des anciens CTA et contrôle du formulaire public.
- **Statut final :** corrigé.

## 2. Absence d’étude de cas client

- **Problème initial :** aucune preuve de résultat client comparable et autorisée.
- **Solution appliquée :** trois démonstrations honnêtes, explicitement présentées comme exemples et objectifs variables, sans client ni métrique inventés.
- **Fichiers :** `index.html`, `en/index.html`, `scripts/apply-cro-overhaul.js`.
- **Risque restant :** moyen ; de vrais cas clients restent préférables lorsqu’ils seront autorisés.
- **Test :** contrôle des libellés « Exemple démonstratif » et de l’absence de résultat garanti.
- **Statut final :** corrigé sans fausse preuve ; amélioration future documentée.

## 3. Rassurance trop tardive

- **Problème initial :** les premières preuves et objections arrivaient après plusieurs écrans.
- **Solution appliquée :** ligne de rassurance immédiatement sous le hero, critères d’adéquation, processus, livrables et coûts remontés.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible ; l’ordre pourra être optimisé par test A/B.
- **Test :** contrôle visuel desktop et présence des blocs dans l’ordre du DOM.
- **Statut final :** corrigé.

## 4. Données et confidentialité non traitées

- **Problème initial :** données utilisées, accès et précautions inconnus.
- **Solution appliquée :** principes de minimisation, accès limités, outils tiers documentés, absence d’entraînement d’un modèle FikolasAI et formulation non-certifiante.
- **Fichiers :** `index.html`, `en/index.html`, `scripts/apply-trust-content.js`.
- **Risque restant :** moyen ; les conditions exactes dépendent du stack retenu.
- **Test :** contrôle FR/EN et détection des garanties RGPD interdites.
- **Statut final :** corrigé avec réserve explicite.

## 5. Propriété, hébergement et réversibilité flous

- **Problème initial :** comptes, livrables, export et fin de collaboration non précisés.
- **Solution appliquée :** clauses prudentes sur les données, comptes client, remise des livrables, reprise et limites des plateformes tierces.
- **Fichiers :** `index.html`, `en/index.html`, `BUSINESS-VALIDATION.md`.
- **Risque restant :** moyen ; la cession exacte doit être contractualisée.
- **Test :** contrôle éditorial des trois thèmes et absence de cession intégrale automatique.
- **Statut final :** corrigé au niveau précontractuel.

## 6. Coûts futurs opaques

- **Problème initial :** API, logiciels, hébergement et maintenance n’étaient pas distingués.
- **Solution appliquée :** liste des coûts possibles, validation avant démarrage, facturation tierce expliquée et absence d’abonnement FikolasAI imposé.
- **Fichiers :** `index.html`, `en/index.html`, pages Agent normalisées.
- **Risque restant :** faible ; le montant dépend de chaque projet.
- **Test :** détection des anciens tarifs mensuels non validés.
- **Statut final :** corrigé.

## 7. Formulaire B2B insuffisamment qualifiant

- **Problème initial :** pas d’entreprise, rôle, fréquence, échéance ou budget.
- **Solution appliquée :** formulaire Tally publié avec 15 champs, dont taille, tâche, équipe, fréquence, outils, objectif, calendrier et budget.
- **Fichiers :** formulaire Tally `2EbyZL`, `FORM-QUALIFICATION.md`.
- **Risque restant :** faible à moyen ; surveiller le taux d’abandon.
- **Test :** lecture du DOM accessible public sans soumission.
- **Statut final :** corrigé.

## 8. Suite et délai après formulaire inconnus

- **Problème initial :** aucun délai ni prochaine étape.
- **Solution appliquée :** délai de réponse généralement observé sous deux jours ouvrés, demande initiale sans obligation de commande et échange proposé uniquement si le projet semble compatible.
- **Fichiers :** `index.html`, `en/index.html`, formulaire Tally.
- **Risque restant :** faible si le délai opérationnel est tenu.
- **Test :** contrôle des microcopies et de la page de confirmation.
- **Statut final :** corrigé.

## 9. Offre Studio vague

- **Problème initial :** offre distincte sans processus commercial confirmé.
- **Solution appliquée :** Studio retiré de la hiérarchie principale et de la grille de parcours.
- **Fichiers :** `index.html`, `en/index.html`, `BUSINESS-VALIDATION.md`.
- **Risque restant :** faible ; son statut définitif reste à décider.
- **Test :** régression automatisée sur les anciennes sections `parcours` / `journeys`.
- **Statut final :** corrigé par masquage prudent.

## 10. Section Offres trop longue et répétitive

- **Problème initial :** plusieurs offres et arguments répétés retardaient la compréhension.
- **Solution appliquée :** trois niveaux : résumé prix/délai, livrables et exemples, puis détails/FAQ ; ancres ajoutées.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** ancres, ordre et unicité de la grille contrôlés.
- **Statut final :** corrigé.

## 11. CTA principal sous la ligne de flottaison

- **Problème initial :** CTA du contenu vers 838 px à 1280 × 720.
- **Solution appliquée :** hero compact, CTA placé immédiatement après prix et promesse.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** viewport desktop 1280 × 768.
- **Statut final :** corrigé.

## 12. Hero trop chargé

- **Problème initial :** près de 900 caractères, cartes et biographie avant décision.
- **Solution appliquée :** conservation exclusive du problème, promesse, prix, délai, CTA, délai de réponse et rassurance.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** contrôle visuel et comparaison FR/EN.
- **Statut final :** corrigé.

## 13. Démonstration confondable avec une preuve client

- **Problème initial :** objectifs chiffrés pouvant ressembler à des résultats réels.
- **Solution appliquée :** suppression des métriques ambiguës ; objectifs sans valeur fictive et réserve visible sur chaque carte.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** contrôle automatisé des garanties et revue éditoriale.
- **Statut final :** corrigé.

## 14. Adéquation du projet inconnue

- **Problème initial :** aucun critère bon/mauvais projet.
- **Solution appliquée :** deux listes symétriques avec supervision, données, validation et limites, suivies d’un CTA.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** présence FR/EN et affichage responsive.
- **Statut final :** corrigé.

## 15. Différenciation trop déclarative

- **Problème initial :** bénéfices déclarés sans matérialiser la méthode.
- **Solution appliquée :** différenciation rendue concrète par périmètre avant lancement, tests, documentation, validation humaine, livrables et réversibilité.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** moyen ; un comparatif concurrentiel n’a volontairement pas été ajouté sans validation.
- **Test :** revue des affirmations défendables.
- **Statut final :** corrigé sans comparaison non prouvée.

## 16. FAQ insuffisante

- **Problème initial :** données, propriété, maintenance, coûts, faisabilité et résultats absents.
- **Solution appliquée :** 15 questions FR/EN et FAQPage JSON-LD synchronisé.
- **Fichiers :** `index.html`, `en/index.html`, `scripts/apply-trust-content.js`.
- **Risque restant :** faible ; les contrats priment sur le contenu public.
- **Test :** comptage automatique de 15 cartes et validation JSON-LD.
- **Statut final :** corrigé.

## 17. Preuves institutionnelles peu contextualisées

- **Problème initial :** le prospect devait déduire leur pertinence.
- **Solution appliquée :** chaque ressource publique indique désormais ce qu’elle permet de vérifier et précise qu’elle n’est ni témoignage ni garantie.
- **Fichiers :** `index.html`, `en/index.html`.
- **Risque restant :** faible.
- **Test :** liens et libellés contrôlés.
- **Statut final :** corrigé.

## 18. Délai contradictoire

- **Problème initial :** « prêt la semaine prochaine » contredisait 15 jours ouvrés.
- **Solution appliquée :** délai cible normalisé et point de départ défini.
- **Fichiers :** 81 pages HTML, scripts d’application.
- **Risque restant :** faible.
- **Test :** détection automatique des anciennes promesses.
- **Statut final :** corrigé.

## 19. CTA Agent multiples

- **Problème initial :** « Étudier », « Nous contacter » et « Vérifier » créaient des attentes différentes.
- **Solution appliquée :** libellé Agent unifié et attribution UTM conservée.
- **Fichiers :** pages HTML, `scripts/apply-growth-positioning.js`.
- **Risque restant :** faible.
- **Test :** recherche globale et contrôle des campagnes Tally.
- **Statut final :** corrigé.

## 20. Micro-frictions de navigation

- **Problème initial :** logo vers `#`, ancres incohérentes, lien de langue incorrect et lien légal absent.
- **Solution appliquée :** destinations corrigées, ancres FR/EN alignées, lien de langue anglais vers l’accueil FR et anciens liens « mentions légales » redirigés vers la page de confidentialité existante.
- **Fichiers :** pages HTML, `scripts/apply-cro-overhaul.js`.
- **Risque restant :** faible.
- **Test :** résolution automatique des liens locaux et des ancres sur 81 pages.
- **Statut final :** corrigé.

## Conclusion

Les 20 freins sont traités sans témoignage, marque cliente, résultat chiffré ou garantie juridique inventés. Les décisions qui exigent encore une validation humaine sont isolées dans `BUSINESS-VALIDATION.md`.

# README

## Projet ICT304 SOFTWARE TESTING

### Introduction

Ce projet ICT304 vise à développer une application mobile pour un restaurant local. L'application permet aux
utilisateurs de créer un panier de produits et d'obtenir des promotions. Ce document décrit le plan de test de
l'application, incluant les objectifs, la portée, l'approche, les ressources nécessaires et le calendrier des tests,
afin d'assurer que toutes les fonctionnalités critiques de l'application sont correctement testées et que les exigences
métiers sont respectées. Ce plan de test a été élaboré en se basant sur les meilleures pratiques décrites dans le
chapitre 4 du livre "Introduction to Software Testing".

### Objectifs de Test

Les objectifs de ce plan de test sont :

- Vérifier que toutes les fonctionnalités de l'application fonctionnent comme prévu.
- Identifier et corriger les défauts avant la mise en production.
- Assurer que l'application répond aux exigences métiers et techniques.

### Portée des Tests

La portée des tests inclut les domaines, fonctionnalités et limites suivants :

#### Fonctionnalités couvertes :

- **Gestion du panier** : Création, modification et suppression des paniers d'achat.
- **Gestion des utilisateurs** : Inscription, authentification, et gestion des profils utilisateurs.
- **Gestion des promotions** : Création et application des promotions sur les produits.
- **Gestion des événements** : Création, modification, et suppression des événements.
- **Gestion des erreurs** : Affichage et gestion des messages d'erreur.

#### Fonctionnalités non couvertes :

- **Compatibilité avec les anciens navigateurs** : Les tests ne couvriront pas les versions de navigateurs plus
  anciennes que celles supportées officiellement.
- **Tests de performance extrêmes** : Les tests sous des conditions de trafic exceptionnellement élevées ne seront pas
  couverts.
- **Intégration avec des systèmes tiers non critiques** : Certaines intégrations spécifiques avec des systèmes tiers qui
  ne sont pas encore disponibles ou jugées non essentielles pour la version actuelle.

### Approche de Test

La stratégie de test dépend de la complexité du projet, des délais et des ressources disponibles. Les approches de test
incluent :

- **Tests boîte noire** : Basés sur les spécifications des exigences.
- **Tests boîte blanche** : Basés sur la structure interne du code.
- **Tests boîte grise** : Combinaison des tests boîte noire et blanche.
- **Tests manuels** : Exécution manuelle des cas de test.
- **Tests automatisés** : Utilisation d'outils pour automatiser les cas de test.
- **Tests exploratoires** : Exploration et test sans plan de test formel.
- **Tests de régression** : Retest des fonctionnalités après des modifications.

### Ressources de Test

Les ressources nécessaires pour les tests incluent :

- **Personnel** : Équipe de testeurs, chefs d'équipe, et gestionnaires de tests.
- **Outils de test** : Outils de gestion des tests, outils de suivi des défauts, outils d'automatisation.
- **Infrastructure** : Serveurs, équipements réseau, environnements de test.
- **Données** : Données de test représentatives de l'environnement de production.
- **Budget** : Couverture des coûts liés aux activités de test.

### Calendrier des Tests

Le calendrier des tests, bien que limité par la contrainte d'une semaine, inclura les activités suivantes :

1. **Identification des activités de test :** Tests fonctionnels, tests de performance, tests de sécurité.
2. **Ordre des activités de test :** Les tests fonctionnels seront effectués en premier, suivis par les tests de
   performance et de sécurité.
3. **Allocation des ressources :** Les membres de l'équipe de test seront assignés aux différentes activités en fonction
   de leurs compétences et disponibilités.
4. **Revue et amélioration :** Des révisions quotidiennes pour ajuster le plan si nécessaire.
5. **Communication du calendrier de test :** Partagé avec toutes les parties prenantes via des mises à jour
   quotidiennes.

### Cas de Test

La définition des cas de test inclut :

- Identification de l'objectif de chaque cas de test.
- Détermination des données d'entrée.
- Définition des résultats attendus.
- Spécification des étapes à suivre.
- Documentation des détails du cas de test.
- Revue et amélioration des cas de test.
- Groupement et priorisation des cas de test.
- Définition de la couverture des tests.

**Exemples de Cas de Test :**

1. **Gestion du panier :**
    - **Objectif :** Vérifier la création d'un panier.
    - **Données d'entrée :** Sélection de produits.
    - **Résultats attendus :** Le panier doit afficher correctement les produits ajoutés.
    - **Étapes :**
        1. Ouvrir l'application.
        2. Se connecter.
        3. Ajouter un produit au panier.
        4. Vérifier que le produit apparaît dans le panier.
2. **Gestion des utilisateurs :**
    - **Objectif :** Vérifier l'inscription d'un nouvel utilisateur.
    - **Données d'entrée :** Informations d'inscription valides.
    - **Résultats attendus :** L'utilisateur doit être enregistré et pouvoir se connecter.
    - **Étapes :**
        1. Ouvrir l'application.
        2. Accéder à la page d'inscription.
        3. Entrer les informations requises.
        4. Soumettre le formulaire.
        5. Vérifier l'inscription réussie.

### Données de Test

La sélection et la préparation des données de test incluent :

- Analyse des exigences logicielles.
- Identification des différents scénarios et cas d'utilisation.
- Utilisation d'outils pour générer et gérer les données de test.

### Processus de Gestion des Défauts

Le processus de gestion des défauts comprend :

1. **Journalisation des défauts** : Enregistrement des défauts avec les détails nécessaires.
2. **Classification des défauts** : Classification selon la sévérité et la priorité.
3. **Analyse des défauts** : Identification des causes profondes.
4. **Assignation des défauts** : Attribution aux développeurs.
5. **Correction des défauts** : Résolution des défauts.
6. **Vérification des défauts** : Confirmation de la résolution.
7. **Clôture des défauts** : Fermeture des défauts résolus.

### Critères d'Arrêt des Tests

Les critères d'arrêt des tests incluent :

- Réalisation des exigences définies.
- Passage d'un nombre défini de cas de test.
- Atteinte d'un niveau spécifique de couverture de test.
- Atteinte de niveaux acceptables de performance et de qualité.

### Revue et Approbation du Plan de Test

La revue du plan de test implique :

- Analyse complète du plan par les parties prenantes.
- Approbation par le sponsor du projet ou le gestionnaire de projet.
- Mise à jour régulière du plan de test au besoin.

### Risques et Assomptions

- **Risques** :
    - Manque de temps pour les tests complets.
    - Problèmes de dernière minute avec l'environnement de test.
- **Assomptions** :
    - Les exigences de l'application sont figées et ne changeront pas pendant la phase de test.
    - Les ressources nécessaires (personnel, outils, infrastructure) seront disponibles.

### Indicateurs de Performance (KPIs)

Définir des indicateurs clés de performance pour mesurer l'efficacité des tests, comme :

- Taux de réussite des tests.
- Nombre de défauts trouvés.
- Nombre de défauts corrigés.
- Temps moyen de correction des défauts.
- Couverture des tests.

### Plans de Contingence

Inclure des plans de contingence pour gérer les problèmes imprévus pendant le test :

- **Problème :** Indisponibilité des ressources de test.
    - **Action corrective :** Reprioriser les cas de test et redistribuer les ressources disponibles.
- **Problème :** Défauts critiques non résolus.
    - **Action corrective :** Planifier des sprints supplémentaires pour corriger les défauts critiques avant la mise en
      production.

### Mise en Œuvre des Tests

Expliquer comment les tests seront exécutés, par qui, et les étapes à suivre :

- **Équipe de test** : Les membres de l'équipe de test seront responsables de l'exécution des cas de test, de la
  journalisation des défauts et de la vérification des corrections.
- **Étapes à suivre** :
    1. Préparer l'environnement de test.
    2. Exécuter les cas de test manuels et automatisés.
    3. Documenter les résultats des tests.
    4. Analyser les résultats et identifier les défauts.
    5. Corriger les défauts et retester.
    6. Communiquer les résultats aux parties prenantes.

### Conclusion

Ce plan de test fournit une feuille de route claire pour les activités de test, minimisant les risques de défauts et
assurant que le logiciel répond aux exigences de qualité.

---

### Frameworks de Test Recommandés

- **Pour les Tests Unitaires** :
    - Java : JUnit, TestNG
    - JavaScript : Jest, Mocha
    - Python : unittest, pytest

- **Pour les Tests Intégrés/End-to-End (E2E)** :
    - Selenium (pour les applications web)
    - Appium (pour les applications mobiles)
    - Cypress (pour les applications web)


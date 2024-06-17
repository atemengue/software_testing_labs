# README
----------			---------------
		TEST PLAN
----------			---------------
## Projet INFO352 SOFTWARE TESTING

### Introduction

Ce projet ICT304 vise à développer une application mobile pour un restaurant local. L'application permet aux
utilisateurs de créer un panier de produits et d'obtenir des promotions. Ce document décrit le plan de test de
l'application, incluant les objectifs, la portée, l'approche, les ressources nécessaires et le calendrier des tests,
afin d'assurer que toutes les fonctionnalités critiques de l'application sont correctement testées et que les exigences
métiers sont respectées. Ce plan de test a été élaboré en se basant sur les meilleures pratiques décrites dans le
chapitre 4 du livre "Introduction to Software Testing".

### Objectifs de test :

    Vérifier que toutes les fonctionnalités clés de l'application fonctionnent correctement.
    Identifier et corriger les défauts critiques avant la mise en production.
    S'assurer que l'application répond aux exigences métier et techniques spécifiées.

### Portée des tests :
		### Fonctionnalités couvertes :

    Gestion du panier d'achat (création, modification, suppression)
    Gestion des comptes utilisateurs (inscription, authentification, profils)
    Gestion des promotions (création, application)
    Gestion des événements (création, modification, suppression)
    Gestion des messages d'erreur

		### Limitations :

    Tests de compatibilité limités aux navigateurs web récents
    Tests de performance en conditions normales, pas de tests de pic de charge
    Intégrations avec certains systèmes tiers non critiques non testées

		### Approche de test :

    Tests boîte noire basés sur les spécifications fonctionnelles
    Tests boîte blanche sur la structure du code
    Tests manuels et automatisés
    Tests de régression après chaque modification
    Tests exploratoires complémentaires

		### Ressources de test :

    Équipe de testeurs, chefs de projet, gestionnaires de test
    Outils de gestion de tests, de suivi des défauts, d'automatisation
    Environnements de test représentatifs de la production
    Données de test réalistes
    Budget alloué aux activités de test

		### Calendrier des tests :

    Identification des activités de test (fonctionnelles, performance, sécurité)
    Ordonnancement des tests (fonctionnels, performance, sécurité)
    Affectation des ressources en fonction des compétences
    Revues quotidiennes et ajustements du plan si nécessaire
    Communication du calendrier aux parties prenantes

### Cas de Test

		### La définition des cas de test inclut :

    Identification de l'objectif de chaque cas de test
    Détermination des données d'entrée
    Définition des résultats attendus
    Spécification des étapes à suivre
    Documentation des détails du cas de test
    Revue et amélioration des cas de test
    Groupement et priorisation des cas de test
    Définition de la couverture des tests

		### Deux exemples de cas de test sont fournis :

    Gestion du panier
        Objectif : Vérifier la création d'un panier
        Données d'entrée : Sélection de produits
        Résultats attendus : Le panier doit afficher correctement les produits ajoutés
        Étapes à suivre

    Gestion des utilisateurs
        Objectif : Vérifier l'inscription d'un nouvel utilisateur
        Données d'entrée : Informations d'inscription valides
        Résultats attendus : L'utilisateur doit être enregistré et pouvoir se connecter
        Étapes à suivre

		### Données de Test

La sélection et la préparation des données de test incluent :

    Analyse des exigences logicielles
    Identification des différents scénarios et cas d'utilisation
    Utilisation d'outils pour générer et gérer les données de test

		### Processus de Gestion des Défauts

Le processus de gestion des défauts comprend :

    Journalisation des défauts
    Classification des défauts
    Analyse des défauts
    Assignation des défauts
    Correction des défauts
    Vérification des défauts
    Clôture des défauts

### Critères d'Arrêt des Tests

		### Les critères d'arrêt des tests incluent :

    Réalisation des exigences définies
    Passage d'un nombre défini de cas de test
    Atteinte d'un niveau spécifique de couverture de test
    Atteinte de niveaux acceptables de performance et de qualité

### Revue et Approbation du Plan de Test

		### La revue du plan de test implique :

    Analyse complète du plan par les parties prenantes
    Approbation par le sponsor du projet ou le gestionnaire de projet
    Mise à jour régulière du plan de test au besoin

### Risques et Assomptions

		### Risques :

    Manque de temps pour les tests complets
    Problèmes de dernière minute avec l'environnement de test

		### Assomptions :

    Les exigences de l'application sont figées et ne changeront pas pendant la phase de test
    Les ressources nécessaires seront disponibles

### Plans de Contingence

Inclure des plans de contingence pour gérer les problèmes imprévus pendant le test :

- **Problème :Indisponibilité des ressources de test.
- **Action corrective : Reprioriser les cas de test et redistribuer les ressources disponibles.
- **Problème :Défauts critiques non résolus.
- **Action corrective :Planifier des sprints supplémentaires pour corriger les défauts critiques avant la mise en
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


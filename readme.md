# README - Gestion du Panier d'Achat et des Promotions pour une Application Mobile

## Introduction

Ce projet contient des fonctions essentielles pour gérer les éléments d'un panier d'achat dans une application mobile. L'objectif principal de l'application est de permettre aux utilisateurs de créer un panier de produits et d'obtenir des promotions. Ce document décrit les principales fonctionnalités, la gestion des erreurs, les événements, les promotions, et la gestion des utilisateurs, ainsi qu'un plan de test détaillé pour assurer la qualité et la fiabilité de l'application.

## Fonctionnalités

### Gestion du Panier

- **calculateTotal(basketItems, discount = null)**: Calcule le total du panier, en appliquant éventuellement une réduction.
- **showAdverts(user)**: Affiche des publicités ciblées pour l'utilisateur.
- **searchBasket(basketItems, searchQuery)**: Recherche des éléments dans le panier en fonction d'une requête.
- **getBasketItem(basketItems, event)**: Récupère un élément spécifique du panier.
- **createBasketItem(basketItems, event, requiredTickets)**: Ajoute un nouvel élément au panier.
- **serializeBasketItemsToJson(basketItems)**: Sérialise les éléments du panier en JSON.

### Gestion des Erreurs

Le module de gestion des erreurs inclut plusieurs classes d'erreurs personnalisées :

- **InvalidEventNameError**
- **InvalidEventPriceError**
- **InvalidUsernameError**
- **InvalidReferralCodeError**
- **UserHasAccountError**

### Gestion des Événements

Les fonctions suivantes permettent de gérer les événements et d’obtenir des informations relatives à ceux-ci :

- **isSoldOut()**: Vérifie si un événement est complet.
- **getTagLine(event, minimumTicketCount, isPopular)**: Génère une tagline pour un événement.
- **createEvent(name, price, availableTickets)**: Crée un nouvel événement.
- **today(event)**: Vérifie si l'événement a lieu aujourd'hui.
- **next7Days(event)**: Vérifie si l'événement a lieu dans les 7 prochains jours.
- **next30Days(event)**: Vérifie si l'événement a lieu dans les 30 prochains jours.
- **getEvents(events, searchPredicate)**: Récupère une liste d'événements en fonction d'un prédicat de recherche.

### Gestion des Promotions

Les fonctions suivantes permettent de calculer et d'appliquer des promotions :

- **calculatePercentageDiscount(percentage, minimumSpend, currentPrice)**: Calcule une réduction en pourcentage.
- **calculateMoneyOff(discount, minimumSpend, currentPrice)**: Calcule une réduction fixe en argent.
- **generateReferralCode(userId)**: Génère un code de parrainage pour un utilisateur.
- **applyDiscount(discountCode, currentTotal)**: Applique un code de réduction à un total actuel.
- **getExchangeRate(currencyCode, callback)**: Récupère le taux de change pour une devise donnée.
- **getDiscount(code)**: Récupère les détails d'une réduction en fonction d'un code.

### Gestion des Utilisateurs

Les fonctions suivantes permettent de gérer les utilisateurs et leurs achats :

- **userExists(username)**: Vérifie si un utilisateur existe.
- **createUserId()**: Crée un nouvel identifiant utilisateur.
- **isValidUserName(userName)**: Vérifie si un nom d'utilisateur est valide.
- **createAccount(username)**: Crée un nouveau compte utilisateur.
- **getPastPurchases(userId)**: Récupère les achats passés d'un utilisateur.
- **parsePurchaseResponse(purchaseData)**: Analyse les données de réponse d'un achat.
- **getPurchaseHistory(userId)**: Récupère l'historique d'achat d'un utilisateur.

## Plan de Test

Le plan de test détaillé couvre les différents scénarios et cas de tests pour assurer la qualité et la fiabilité de l'application, avec un accent particulier sur la gestion des erreurs.

### Objectifs de Test

- Vérifier que toutes les erreurs personnalisées sont correctement implémentées.
- Assurer que les messages d'erreurs sont appropriés et descriptifs.
- Valider que les exceptions sont levées et capturées correctement.
- Garantir la couverture complète du code pour les classes d'erreurs définies.

### Portée du Test

Le test couvrira les aspects suivants :
- Tests unitaires pour les classes d'erreurs personnalisées.
- Tests paramétrés pour vérifier différents messages d'erreurs.
- Tests de stack trace pour les exceptions levées.
- Tests de cas limites et scénarios supplémentaires.

### Approche de Test

Les tests seront réalisés en utilisant le framework de test Vitest. Les tests suivront le pattern AAA (Arrange, Act, Assert) et utiliseront des tests paramétrés pour maximiser la réutilisation et la couverture.

### Environnement de Test

- **Framework**: Vitest
- **Langage**: JavaScript
- **Outils de test**: Node.js, Vitest

## Membres du Groupe

- SOKOUDJOU CHENDJOU CHRISTIAN MANUEL 21T2396
- TCHAMI TAMEN SORELLE                20U2855
- TSAFACK BRUNEL WEELFRED             20U2956
- STEPHANE NKOLO ROYLEX KOUMNDA       21T2588
- KOUAM NOUBISSI SERAPHIN BRICE       21T2432


## Comment Exécuter les Tests

1. **Installer Node.js et Vitest**: Assurez-vous que Node.js est installé. Ensuite, installez Vitest en utilisant npm:
    ```bash
    npm install vitest --save-dev
    ```

2. **Cloner le Répertoire du Projet**: Si ce n'est pas déjà fait, clonez le répertoire du projet:
    ```bash
    git clone <URL_DU_PROJET>
    cd <NOM_DU_PROJET>
    ```

3. **Exécuter les Tests**: Utilisez Vitest pour exécuter les tests:
    ```bash
    npx vitest
    ```

## Conclusion

Ce projet vise à fournir une gestion robuste et fiable du panier d'achat, des promotions, et des événements pour une application mobile. En suivant ce plan de test, nous pouvons identifier et corriger les problèmes liés à la gestion des erreurs, assurant ainsi une meilleure expérience utilisateur.

Pour toute question ou commentaire, veuillez contacter l'équipe de développement.

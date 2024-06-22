import { describe, it, expect } from 'vitest';
import { User, userExists, createUserId } from '../../js/users/users';

// Tests pour la classe User
describe('User class', () => {
    it('should create a user with the given id and username', () => {
        // Arrange
        const id = 1;
        const username = 'testuser';

        // Act
        const user = new User(id, username);

        // Assert
        expect(user.id).toBe(id);
        expect(user.username).toBe(username);
        expect(user.isPremium).toBe(false);
    });
});

// Tests pour userExists
describe('userExists', () => {
    it('should return true if the username exists', async () => {
        // Arrange
        const username = "newuser1@pluralsight.com";

        // Act
        const exists = await userExists(username);

        // Assert
        expect(exists).toBe(true);
    });

    it('should return false if the username does not exist', async () => {
        // Arrange
        const username = "nonexistentuser@pluralsight.com";

        // Act
        const exists = await userExists(username);

        // Assert
        expect(exists).toBe(false);
    });
});

// Tests pour createUserId
describe('createUserId', () => {
    it('should return a new user id', () => {
        // Arrange
        // Pas de préparation nécessaire pour cette fonction

        // Act
        const newUserId = createUserId();

        // Assert
        expect(newUserId).toBe(2);
    });
});

/* Explication :

Importation et configuration de Vitest : On utilise les fonctions describe, it, et expect fournies par 
Vitest pour structurer et exécuter les tests.

Tests pour la classe User :
Test de création d'un utilisateur : Vérifie que la création d'un utilisateur initialise correctement 
les propriétés id, username et isPremium.

Tests pour la fonction userExists :
Utilisateur existant : Vérifie que la fonction retourne true pour un utilisateur existant.
Utilisateur inexistant : Vérifie que la fonction retourne false pour un utilisateur non existant.

Tests pour la fonction createUserId :
Retourne un nouvel identifiant utilisateur : Vérifie que la fonction retourne l'identifiant correct (dans ce cas, 2). */
// Emplacement des fichiers:
// - user.js dans js/users/user.js
// - Tous les tests dans test/

import { describe, it, expect } from 'vitest';
import { User, userExists, createUserId } from '../../js/users/users';

// Description des tests sur la classe User
describe('Classe User', () => {
  // Cas de test : Créer un nouvel utilisateur avec les valeurs par défaut
  it('devrait créer un nouvel utilisateur avec les valeurs par défaut', () => {
    const user = new User(1, 'newuser1@pluralsight.com');
    expect(user.id).toBe(1);
    expect(user.username).toBe('newuser1@pluralsight.com');
    expect(user.isPremium).toBe(false);
  });
});

// Description des tests sur la fonction userExists
describe('Fonction userExists', () => {
  // Cas de test : Vérifier que le nom d'utilisateur existe
  it("devrait retourner true si le nom d'utilisateur existe", async () => {
    const exists = await userExists('newuser1@pluralsight.com');
    expect(exists).toBe(true);
  });

  // Cas de test : Vérifier que le nom d'utilisateur n'existe pas
  it("devrait retourner false si le nom d'utilisateur n'existe pas", async () => {
    const exists = await userExists('nonexistinguser@example.com');
    expect(exists).toBe(false);
  });
});

// Description des tests sur la fonction createUserId
describe('Fonction createUserId', () => {
  // Cas de test : Vérifier que la fonction retourne un nouvel ID d'utilisateur
  it("devrait retourner un nouvel ID d'utilisateur", () => {
    const userId = createUserId();
    expect(typeof userId).toBe('number');
    expect(userId).toBe(2);
  });
});
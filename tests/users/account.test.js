// Emplacement des fichiers :
// - user.js dans js/users/user.js
// - account.js dans js/users/account/account.js
// - purshaseHistory.js dans js/users/account/purchaseHistory/purshaseHistory.js
// - Tous les tests dans test/users

import { assert, expect, test, vi, describe } from 'vitest';
import { InvalidUsernameError } from '../../js/error-handling/exceptions';
import * as users from '../../js/users/users';
import { Purchase, createAccount, getPastPurchases, isValidUserName } from '../../js/users/account/account';
import purchaseHistory from '../../js/users/account/purchaseHistory/__mocks__/purchaseHistory';

describe('Purchase', () => {
  test("devrait créer une instance d'Achat", () => {
    const achat = new Purchase("Nom de l'événement", 2, 100);
    assert.strictEqual(achat.eventName, "Nom de l'événement", 'le nom devrait etre correct');
    assert.strictEqual(achat.tickets, 2, 'le numero de ticket devrait etre valide');
    assert.strictEqual(achat.cost, 100, 'le cout devrait etre correct');
  });
});

describe('isValidUserName', () => {
  test("Vérifier si le nom d'utilisateur est valide", async () => {
    assert.strictEqual(await isValidUserName('user@domain.com'), true, "Le nom d'utilisateur devrait être valide");
  });

  test("Vérifier si le nom d'utilisateur n'est pas valide", async () => {
    assert.strictEqual(await isValidUserName('userdomain.com'), false, "Le nom d'utilisateur devrait être invalide");
  });
});

describe('CreateAccount', () => {
  test("Échec de création de compte avec un nom d'utilisateur invalide", async () => {
    await expect(createAccount('userdomain.com')).rejects.toThrow(InvalidUsernameError);
  });

  test("Créer un compte utilisateur dans le cas ou l'utilisateur n'existe pas", async () => {
    // Utiliser vi.spyOn pour espionner les méthodes
    const userExistsSpy = vi.spyOn(users, 'userExists').mockResolvedValue(false);
    const createUserIdSpy = vi.spyOn(users, 'createUserId').mockReturnValue('12345');

    const result = await createAccount('user@domain.com');
    expect(result.data).toEqual({
      userId: '12345',
      username: 'user@domain.com',
    });

    userExistsSpy.mockResolvedValue(true);
    await expect(createAccount('user@domain.com')).rejects.toEqual('User already exists');

    // Restaurer les méthodes originales
    userExistsSpy.mockRestore();
    createUserIdSpy.mockRestore();
  });

  test("devrait revoyer un message si l'utilisateur existe deja", async () => {
    // Utiliser vi.spyOn pour espionner les méthodes
    const userExistsSpy = vi.spyOn(users, 'userExists').mockResolvedValue(false);

    userExistsSpy.mockResolvedValue(true);
    await expect(createAccount('user@domain.com')).rejects.toEqual('User already exists');

    // Restaurer les méthodes originales
    userExistsSpy.mockRestore();
  });
});

describe('getPastPurchases', () => {
  test("Récupérer les achats passés de l'utilisateur", () => {
    const userId = '12345';
    const expectedPurchases = [
      {
        name: 'Punk Goes Pop - 90s',
        tickets: 2,
        price: 40.0,
      },
      {
        name: 'Adventures Live!',
        tickets: 5,
        price: 120.0,
      },
      {
        name: 'Folk dance party!',
        tickets: 3,
        price: 75.0,
      },
    ];

    const purchases = getPastPurchases(userId);
    expect(purchases).toEqual(expectedPurchases);
  });

  test("devrait lever une erreur s'il est impossible de récupérer l'historique des achats", () => {
    purchaseHistory.getPurchaseHistory.mockReturnValue({ readyState: 3 }); // Simuler un readyState différent de 4
    expect(() => getPastPurchases(1)).toThrowError('Failed to get purchase history');

    // Simuler une récupération réussie pour vérifier le comportement normal
    purchaseHistory.getPurchaseHistory.mockReturnValue({
      readyState: 4,
      response: {
        events: [
          {
            name: 'Un événement',
            tickets: 4,
            price: 100.0,
          },
        ],
      },
    });
    expect(() => getPastPurchases(1)).not.toThrowError();
  });
});

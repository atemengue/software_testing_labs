import { describe, it, expect, vi, beforeEach } from 'vitest';
import { purchaseHistory} from '../../js/users/purchaseHistory/purchaseHistory';
import { isValidUserName } from '../../js/users/account/account'; 
import { getPastPurchases } from '../../js/users/account/account';
//test de la fonction isValidUserName



describe('isValidUserName', () => {
    it('should return false for an empty username', async () => {
        // Arrange
        const username = '';

        // Act
        const result = await isValidUserName(username);

        // Assert
        expect(result).toBe(false);
    });

    it('should return false for a username without "@"', async () => {
        // Arrange
        const username = 'invaliduser.com';

        // Act
        const result = await isValidUserName(username);

        // Assert
        expect(result).toBe(false);
    });

    it('should return true for a valid username', async () => {
        // Arrange
        const username = 'validuser@example.com';

        // Act
        const result = await isValidUserName(username);

        // Assert
        expect(result).toBe(true);
    });

    it('should return false for a null username', async () => {
        // Arrange
        const username = null;

        // Act
        const result = await isValidUserName(username);

        // Assert
        expect(result).toBe(false);
    });
});



   
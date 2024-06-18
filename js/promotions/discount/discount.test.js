import { describe, expect, it, vi } from 'vitest';
import { getDiscount } from './discount';

// Mock d'axios pour simuler l'appel réseau
vi.mock('axios');

// Importer axios pour pouvoir simuler la réponse
import axios from 'axios';

describe('getDiscount function', () => {
    it('should return the correct discount for a given code', async () => {
        const mockResponse = { data: { discount: 0.2 } };
        axios.get.mockResolvedValue(mockResponse);

        // Appeler la fonction getDiscount avec un code donné
        const discount = await getDiscount('SPECIAL20');

        // Vérifier que la réponse renvoyée est correcte
        expect(discount).toEqual(mockResponse);

        // Vérifier l'appel à axios avec les bons paramètres
        expect(axios.get).toHaveBeenCalledWith('/discount', {
            params: { code: 'SPECIAL20' },
        });
    });
});

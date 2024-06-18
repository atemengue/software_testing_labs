import { getDiscount } from './discount'; // Replace 'yourFile' with the actual file name
import axios from 'axios';
import { vi , test, expect} from 'vitest';

// Mock axios.get function
vi.mock('axios');

test('getDiscount handles non-string code', async () => {
  // Arrange
  const nonStringCode = 12345;
  const expectedErrorMessage = 'code must be a string';

  // Act
  try {
    await getDiscount(nonStringCode);
  } catch (error) {
    // Assert
    expect(error.message).toBe(expectedErrorMessage);
  }
});

test('getDiscount calls axios.get with correct URL and params', async () => {
  // Arrange
  const stringCode = 'ABC123';
  const expectedUrl = '/discount';
  const expectedParams = { code: stringCode };

  // Act
  await getDiscount(stringCode);

  // Assert
  expect(axios.get).toHaveBeenCalledWith(expectedUrl, { params: expectedParams });
});

test('getDiscount renvoie les données de la réponse', async () => {
  // Arrange
  const stringCode = 'ABC123';
  const expectedResponseData = { discount: 10 };
  vi.mocked(axios.get).mockResolvedValue({ data: expectedResponseData });

  // Act
  const response = await getDiscount(stringCode);

  // Assert
  expect(response.data).toEqual(expectedResponseData);
});

test('getDiscount lève une erreur si axios.get échoue', async () => {
  // Arrange
  const stringCode = 'ABC123';
  const expectedErrorMessage = 'Network Error';
  vi.mocked(axios.get).mockRejectedValue(new Error(expectedErrorMessage));

  // Act
  try {
    await getDiscount(stringCode);
  } catch (error) {
    // Assert
    expect(error.message).toBe(expectedErrorMessage);
  }
});

test('getDiscount leve une erreur si le statut de la réponse n est pas 200', async () => {
  // Arrange
  const stringCode = 'ABC123';
  const expectedErrorMessage = 'Request failed with status code 404';
  vi.mocked(axios.get).mockResolvedValue({ status: 404, statusText: 'Not Found' });

  // Act
  try {
    await getDiscount(stringCode);
  } catch (error) {
    // Assert
    expect(error.message).toBe(expectedErrorMessage);
  }
});
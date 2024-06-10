import exchangeRateProvider from './exchangeRateProvider';


export default async function getExchangeRate(currencyCode, callback) {
  try {
    const exchangeRate = await exchangeRateProvider.callExchangeRateProvider(currencyCode);
    const response = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      exchangeRate,
    };
    callback(response);
  } catch (error) {
    const response = {
      originalCurrency: 'GBP',
      newCurrency: currencyCode,
      error: error.message,
    };
    callback(response);
  }
}

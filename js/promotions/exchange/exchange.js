import exchangeRateProvider from './exchangeRateProvider';

export default async function getExchangeRate(currencyCode, callback) {

    const exchangeRate = await exchangeRateProvider.callExchangeRateProvider(currencyCode)
    const response = {
        "originalCurrency": "GBP",
        "newCurrency": currencyCode,
        "exchangeRate": exchangeRate
    }
    callback(response);
}

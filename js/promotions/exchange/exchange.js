import exchangeRateProvider from './exchangeRateProvider';

export async function getExchangeRate(currencyCode, callback) {

    const exchangeRate = await exchangeRateProvider.callExchangeRateProvider(currencyCode)
    const response = {
        "originalCurrency": "GBP",
        "newCurrency": currencyCode,
        "exchangeRate": exchangeRate
    }
    callback(response);
}


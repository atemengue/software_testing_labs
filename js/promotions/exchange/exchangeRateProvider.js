const exchangeRateProvider = {

    callExchangeRateProvider: (currencyCode) => {
        // Placeholder function
        // This would call an external service to get the exchange rate values    // This would normally be mocked
        let exchangeRate = 1;

        switch (currencyCode) {
            case "USD":
                exchangeRate = 1.25;
                break;
            case "EUR":
                exchangeRate = 1.18;
                break;
            case "NZD":
                exchangeRate = 1.93;
                break;
            default:
                throw new Error("Currency not supported");
        }
        return exchangeRate;
    }
}

export default exchangeRateProvider;
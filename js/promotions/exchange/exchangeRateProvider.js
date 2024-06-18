const exchangeRateProvider = {

    callExchangeRateProvider: (currencyCode) => {
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

class InvalidEventNameError extends Error {
    constructor(error) {
        super(error);
    }
}

class InvalidEventPriceError extends Error {
    constructor(error) {
        super(error);
    }
}

class InvalidUsernameError extends Error {
    constructor(error) {
        super(error);
    }
}

class InvalidReferralCodeError extends Error {
    constructor(error) {
        super(error);
    }
}

class UserHasAccountError extends Error {
    constructor(error) {
        super(error);
    }
}

export {
    InvalidEventNameError,
    InvalidEventPriceError, InvalidReferralCodeError, InvalidUsernameError, UserHasAccountError
};

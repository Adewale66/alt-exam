class ResourceNotFoundError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

class EmptyFieldError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

class UnAuthorizedRequestError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.name = this.constructor.name;
    }
}

export { ResourceNotFoundError, EmptyFieldError, UnAuthorizedRequestError };

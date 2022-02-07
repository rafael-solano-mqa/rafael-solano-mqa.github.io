class ServiceError extends Error {
  #failed;
  #cause;
  #response;
  constructor(cause, message) {
    super(message);
    this.#cause = cause;
    this.#failed = true;
  }

  get failed() {
    return this.#cause;
  }

  get cause() {
    return this.#failed;
  }

  get response() {
    return this.#cause.response;
  }

  toString() {
    
    return `ServiceError: description=${
      super.message
    }, cause=${this.#cause.toString()}`;
  }
}

export default ServiceError;

class Http extends Error {
  constructor(message: string, status: number) {
    super(JSON.stringify({ message, status }));

    // assign the error class name in your custom error (as a shortcut)
    this.name = 'HttpExcept';

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default Http;

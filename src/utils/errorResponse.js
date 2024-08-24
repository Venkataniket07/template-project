class ErrorResponse extends Error {
  constructor(message, statusCode, errors = [], success = false) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.errors = errors;
  }
}

exports.ErrorResponse = ErrorResponse;

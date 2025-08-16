const ERROR_MESSAGES = {
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request",
  },
  UNAUTHORIZED: {
    status: 401,
    message: "Incorrect email or password",
  },
  FORBIDDEN: {
    status: 403,
    message: "You can only delete your own items",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not found",
  },
  CONFLICT: {
    status: 409,
    message: "Email already exists",
  },
  SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  ERROR_MESSAGES,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};

const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");

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

module.exports = {
  ERROR_MESSAGES,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};

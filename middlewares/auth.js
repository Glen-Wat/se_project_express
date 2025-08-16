const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const ERROR_MESSAGES = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_MESSAGES.UNAUTHORIZED.status)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED.message });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(ERROR_MESSAGES.UNAUTHORIZED.status)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED.message });
  }
  req.user = payload;
  return next();
};

module.exports = auth;

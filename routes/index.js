const router = require("express").Router();

const clothingItem = require("./clothingItems");
const userRouter = require("./users");
const { ERROR_MESSAGES, NotFoundError } = require("../utils/errors");

router.use("/users", userRouter);

router.use("/items", clothingItem);

router.use((req, res, next) =>
  next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message))
);

module.exports = router;

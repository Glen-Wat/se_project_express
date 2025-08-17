const ClothingItem = require("../models/clothingItem");

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ERROR_MESSAGES,
} = require("../utils/errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

// POST / items

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  console.log("Debug: Request body before validation:", req.body);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error("Create item error", err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

// GET / items

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      if (item.owner.toString() !== userId) {
        return next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN.message));
      }
      ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((deletedItem) =>
          res.status(200).send({ message: "Item Deleted", item: deletedItem })
        );
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

const addLike = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      return next(err);
    });
};

const removeLike = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError(ERROR_MESSAGES.NOT_FOUND.message));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST.message));
      }
      return next(err);
    });
};

module.exports = {
  createItem,

  deleteItem,
  addLike,
  removeLike,
  getItems,
};

const {
  BAD_REQUEST,
  SERVER_ERROR,
  NOT_FOUND,
  FORBIDDEN,
} = require("../utils/errors");

const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(SERVER_ERROR).send({ message: err.message });
    });
};

// POST /items

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

//GET /items

const getItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "ID not Found" });
      }
      if (item.owner.toString() !== userId) {
        return res.status(FORBIDDEN).send({ message: "Forbidden" });
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((deletedItem) =>
          res.status(200).send({ message: "Item Deleted", item: deletedItem })
        );
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

const addLike = (req, res) => {
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
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res.status(SERVER_ERROR).send({ message: err.message });
    });
};

const removeLike = (req, res) => {
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
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

module.exports = {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  addLike,
  removeLike,
  getItems,
};

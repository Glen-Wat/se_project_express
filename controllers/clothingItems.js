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
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// POST / items

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
        return;
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// GET / items

const getItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Not Found" });
        return;
      }
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
        return;
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// const updateItem = (req, res) => {
// const { itemId } = req.params;
// const { imageUrl } = req.body;

// ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
// .orFail()
// .then((item) => res.status(200).send(item))
// .catch((err) => {
// console.error(err);
// if (err.name === "DocumentNotFoundError") {
// return res.status(NOT_FOUND).send({ message: "Not found" });
// } else if (err.name === "CastError") {
// return res.status(BAD_REQUEST).send({ message: "Invalid data" });
// } else {
// res
// .status(SERVER_ERROR)
// .send({ message: "An error has occurred on the server" });
//  }
//  });
//  };

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        res.status(NOT_FOUND).send({ message: "ID not Found" });
        return;
      }
      if (item.owner.toString() !== userId) {
        res.status(FORBIDDEN).send({ message: "Forbidden" });
        return;
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
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
        return;
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
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
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
        return;
      }
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "Not found" });
        return;
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
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
        res.status(NOT_FOUND).send({ message: "Not found" });
        return;
      }
      if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data" });
        return;
      }
      res
        .status(SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItem,

  deleteItem,
  addLike,
  removeLike,
  getItems,
};

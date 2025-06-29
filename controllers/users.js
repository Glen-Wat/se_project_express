const User = require("../models/user");
const { BAD_REQUEST, SERVER_ERROR, NOT_FOUND } = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: err.message });
        return;
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST).send({ message: err.message });
        return;
      } else {
        res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        return res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      } else if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      } else {
        return res.status(SERVER_ERROR).send({ message: err.message });
      }
    });
};

module.exports = { getUsers, createUser, getUser };

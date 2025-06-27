const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  getItem,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems, getItem);

router.put("/:itemId", updateItem);

router.delete("/:itemId", deleteItem);

module.exports = router;

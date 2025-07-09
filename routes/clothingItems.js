const router = require("express").Router();

const {
  createItem,
  getItems,

  deleteItem,

  addLike,
  removeLike,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.put("/:itemId/likes", addLike);

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", removeLike);

module.exports = router;

const router = require("express").Router();

const {
  createItem,
  getItems,

  deleteItem,
  getItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");

router.post("/", createItem);

router.get("/", getItems);

router.get("/:itemId", getItem);

router.put("/:itemId/likes", addLike);

router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", removeLike);

module.exports = router;

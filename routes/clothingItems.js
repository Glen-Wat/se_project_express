const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

router.post("/", auth, validateClothingItem, createItem);

router.put("/:itemId/likes", auth, validateId, addLike);

router.delete("/:itemId", auth, validateId, deleteItem);
router.delete("/:itemId/likes", auth, validateId, removeLike);

module.exports = router;

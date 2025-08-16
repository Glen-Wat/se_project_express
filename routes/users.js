const router = require("express").Router();
const {
  getCurrentUser,
  updateCurrentUser,
  createUser,
} = require("../controllers/users");
const {
  validateCreateUser,
  validateUpdateUser,
  validateId,
} = require("../middlewares/validation");
router.get("/me", getCurrentUser);
router.post("/", validateCreateUser, createUser);
router.patch("/me", validateUpdateUser, updateCurrentUser);

router.use(validateId);

module.exports = router;

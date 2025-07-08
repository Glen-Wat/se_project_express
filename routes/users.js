const router = require("express").Router();
const { getUser, updateGetUser } = require("../controllers/users");

router.get("/users/me", getUser);
router.patch("/users/me", updateGetUser);

module.exports = router;

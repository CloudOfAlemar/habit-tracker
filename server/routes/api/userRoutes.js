const router = require("express").Router();
const {
  createUser,
  getAllUsers
} = require("../../controllers/userController");

router.route("/").post(createUser);
router.route("/").get(getAllUsers);

module.exports = router;
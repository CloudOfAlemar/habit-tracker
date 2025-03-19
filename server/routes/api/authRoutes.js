const router = require("express").Router();
const {
  login
} = require("../../controllers/authController");

router.route("/login").post(login);

module.exports = router;
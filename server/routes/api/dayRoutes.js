const router = require("express").Router();
const {
  createDay,
  getAllDays
} = require("../../controllers/dayController");

router.route("/").post(createDay);
router.route("/").get(getAllDays);

module.exports = router;
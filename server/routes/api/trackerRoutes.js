const router = require("express").Router();

const {
  createTracker,
  getAllTrackers
} = require("../../controllers/trackerController");

router.route("/").post(createTracker);
router.route("/").get(getAllTrackers);

module.exports = router;
const router = require("express").Router();
const authMiddleware = require("../../utils/auth");

const {
  createTracker,
  getAllTrackers,
  getUserTrackers
} = require("../../controllers/trackerController");

router.route("/").post(authMiddleware, createTracker);
router.route("/").get(getAllTrackers);
router.route("/user").get(authMiddleware, getUserTrackers);

module.exports = router;
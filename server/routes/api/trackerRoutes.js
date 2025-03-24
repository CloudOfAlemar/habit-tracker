const router = require("express").Router();
const authMiddleware = require("../../utils/auth");

const {
  createTracker,
  getAllTrackers,
  getUserTrackers,
  deleteTracker,
  updateHabits,
  updateJournalHabits
} = require("../../controllers/trackerController");

router.route("/").post(authMiddleware, createTracker);
router.route("/").get(getAllTrackers);
router.route("/user").get(authMiddleware, getUserTrackers);
router.route("/delete").post(authMiddleware, deleteTracker);
router.route("/habits").post(authMiddleware, updateHabits);
router.route("/journalHabits").post(authMiddleware, updateJournalHabits)

module.exports = router;
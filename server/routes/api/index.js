const router = require("express").Router();
const userRoutes = require("./userRoutes");
const trackerRoutes = require("./trackerRoutes");
const habitRoutes = require("./habitRoutes");
const dayRoutes = require("./dayRoutes");

router.use("/users", userRoutes);
router.use("/trackers", trackerRoutes);
router.use("/habits", habitRoutes);
router.use("/days", dayRoutes);

module.exports = router;
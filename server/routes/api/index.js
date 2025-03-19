const router = require("express").Router();
const userRoutes = require("./userRoutes");
const trackerRoutes = require("./trackerRoutes");
const habitRoutes = require("./habitRoutes");
const dayRoutes = require("./dayRoutes");
const authRoutes = require("./authRoutes");

router.use("/users", userRoutes);
router.use("/trackers", trackerRoutes);
router.use("/habits", habitRoutes);
router.use("/days", dayRoutes);
router.use("/auth", authRoutes);

module.exports = router;
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const trackerRoutes = require("./trackerRoutes");
const authRoutes = require("./authRoutes");

router.use("/users", userRoutes);
router.use("/trackers", trackerRoutes);
router.use("/auth", authRoutes);

module.exports = router;
const route = require("express").Router();
const {
  createHabit,
  getAllHabits
} = require("../../controllers/habitController");

route.route("/").post(createHabit);
route.route("/").get(getAllHabits);

module.exports = route;
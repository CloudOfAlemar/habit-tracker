const {Schema, model} = require("mongoose");

const habitSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tracker: {
    type: Schema.Types.ObjectId,
    ref: "Tracker",
    required: true
  }
});

const Habit = model("Habit", habitSchema);

module.exports = Habit;
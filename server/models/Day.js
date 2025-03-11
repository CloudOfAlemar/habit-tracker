const {Schema, model} = require("mongoose");

const daySchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  dayOfMonth: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  journalHabits: [{
    habit: {
      type: Schema.Types.ObjectId,
      ref: "Habit"
    },
    status: {
      type: String,
      enum: ["green", "yellow", "red", ""],
      default: ""
    },
    notes: [{
      type: String
    }]
  }]
});

const Day = model("Day", daySchema);

module.exports = Day;
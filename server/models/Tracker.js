const {Schema, model} = require("mongoose");

const trackerSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true
  },
  monthIndex: {
    type: Number,
    required: true
  },
  habits: [{
    type: String
  }],
  days: [{
    day: {type: String},
    dayOfMonth: {type: Number},
    date: {type: Date},
    journalHabits: [{
      habitTitle: {type: String},
      habitStatus: {
        type: String,
        enum: ["green", "yellow", "red", ""],
        default: ""
      },
      habitNotes: [{type: String}]
    }]
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Tracker = model("Tracker", trackerSchema);

module.exports = Tracker;
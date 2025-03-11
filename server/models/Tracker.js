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
    type: Schema.Types.ObjectId,
    ref: "Habit"
  }],
  days: [{
    type: Schema.Types.ObjectId,
    ref: "Day"
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Tracker = model("Tracker", trackerSchema);

module.exports = Tracker;

// const obj = 
// {
//   year: 2025,
//   months: [
//     {
//       name: "March",
//       id: 2,
//       habits: ["Build Projects", "Learn New Technology", "Workout"],
//       days: [
//         {
//           name: "Tuesday",
//           dayOfTheMonth: 11,
//           date: "2025-03-11T07:00:00.000Z",
//           journal: {
//             habitsLog: [
//               {
//                 title: "Build Projects",
//                 status: "green",
//                 notes: [
//                   "Note text One",
//                   "Note text Two"
//                 ]
//               }
//             ]
//           }
//         }
//       ]
//     }
//   ]
// }
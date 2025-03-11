const {Habit} = require("../models");

module.exports = {
  async createHabit(req, res) {
    try{
      const newlyCreatedHabit = await Habit.create(req.body);
      if(!newlyCreatedHabit) {
        return res.status(400).json({message: "Unable to create Habit."})
      }
      res.status(201).json(newlyCreatedHabit);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  },
  async getAllHabits(req, res) {
    try{
      const habits = await Habit.find({});
      if(!habits) {
        return res.status(400).json({message: "Unable to get Habits."});
      }
      res.status(200).json(habits);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  }
}
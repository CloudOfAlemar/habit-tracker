const {Day} = require("../models");

module.exports = {
  async createDay(req, res) {
    try{
      const newlyCreatedDay = await Day.create(req.body);
      if(!newlyCreatedDay) {
        return res.status(400).json({message: "Unable to create Day."})
      }
      res.status(201).json(newlyCreatedDay);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  },
  async getAllDays(req, res) {
    try{
      const days = await Day.find({});
      if(!days) {
        return res.status(400).json({message: "Unable to get Days."});
      }
      res.status(200).json(days);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  }
}
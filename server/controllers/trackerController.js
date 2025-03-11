const {Tracker} = require("../models");

module.exports = {
  async createTracker(req, res) {
    try{
      const newlyCreatedTracker = await Tracker.create(req.body);
      if(!newlyCreatedTracker) {
        return res.status(400).json({message: "Unable to create Tracker."})
      }
      res.status(201).json(newlyCreatedTracker);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  },
  async getAllTrackers(req, res) {
    try{
      const trackers = await Tracker.find({});
      if(!trackers) {
        return res.status(400).json({message: "Unable to get Trackers."});
      }
      res.status(200).json(trackers);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  }
}
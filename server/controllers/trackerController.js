const {Tracker, User} = require("../models");

module.exports = {
  async createTracker(req, res) {
    try{
      const {year, month, monthIndex} = req.body;
      const userId = req.user.id;

      const newlyCreatedTracker = await Tracker.create({year, month, monthIndex, user: userId});
      if(!newlyCreatedTracker) {
        return res.status(400).json({message: "Unable to create Tracker."})
      }

      await User.findByIdAndUpdate(
        userId,
        {$push: {trackers: newlyCreatedTracker._id}}
      );

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
  },
  async getUserTrackers(req,res) {
    try{
      const userId = req.user.id;
      const user = await User.findById(userId).populate("trackers");
      if(!user) {
        return res.status(400).json({message: "Couldn't get User"});
      }
      res.status(200).json(user.trackers);
    }catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  }
}
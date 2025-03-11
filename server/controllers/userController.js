const {User} = require("../models");

module.exports = {
  async createUser(req, res) {
    try{
      const newlyCreatedUser = await User.create(req.body);
      if(!newlyCreatedUser) {
        return res.status(400).json({message: "Unable to create User."})
      }
      res.status(201).json(newlyCreatedUser);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  },
  async getAllUsers(req, res) {
    try{
      const users = await User.find({});
      if(!users) {
        return res.status(400).json({message: "Unable to get Users."});
      }
      res.status(200).json(users);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  }
}

const jwt = require("jsonwebtoken");
const {User} = require("../models");

module.exports = {
  async createUser(req, res) {
    try {
      const newlyCreatedUser = await User.create(req.body);

      const token = jwt.sign(
        {id: newlyCreatedUser._id, username: newlyCreatedUser.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
      );
      
      res.status(201).json({
        message: "USER_CREATION_SUCCESSFUL",
        user: {id: newlyCreatedUser._id, username: newlyCreatedUser.username},
        token
      });
    } catch(error) {
      res.status(500).json({message: "Server Error", error})
    }
  },
  async getAllUsers(req, res) {
    try{
      const users = await User.find({}).populate("trackers");
      if(!users) {
        return res.status(400).json({message: "Unable to get Users."});
      }
      res.status(200).json(users);
    } catch(error) {
      res.status(500).json({message: "Server Error", error: error.message});
    }
  },
}

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
  }
}

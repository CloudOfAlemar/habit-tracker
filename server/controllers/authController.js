const {User} = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  async login(req, res) {
    try {
      const user = await User.findOne({username: req.body.username});
      if(!user) {
        return res.status(400).json({message: "USER_NOT_FOUND"});
      }
  
      const isPasswordValid = await user.comparePassword(req.body.password);
      if(!isPasswordValid) {
        return res.status(400).json({message: "INCORRECT_PASSWORD"});
      }
  
      const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"}
      );
  
      res.status(200).json({
        message: "LOGIN_SUCCESSFUL",
        user: {id: user._id, username: user.username},
        token
      });
    } catch(error) {
      res.status(500).json({message: "Server Error", error});
    }
  }
}
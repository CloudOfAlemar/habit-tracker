const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Username must contain at least 3 characters."]
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}\[\]|\\:;"'<,>.?/]).{8,}$/,
      "Password must include at least 8 characters, a number and a special character."
    ]
  },
});

const User = model("User", userSchema);

module.exports = User;
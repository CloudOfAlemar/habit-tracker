const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");

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
  trackers: [{
    type: Schema.Types.ObjectId,
    ref: "Tracker"
  }]
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next(); // If the password field is not changed, skip hashing.
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch(error) {
    next( error );
  }
});

userSchema.methods.comparePassword = async function(passwordToCompare) {
  try {
    return await bcrypt.compare(passwordToCompare, this.password);
  } catch(error) {
    console.log( "Error while comparing passwords:", error );
    return false;
  }
}

const User = model("User", userSchema);

module.exports = User;
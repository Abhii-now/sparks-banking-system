const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  gender: String,
  balance: Number,
  email: String,
});
module.exports = mongoose.model("User", userSchema);

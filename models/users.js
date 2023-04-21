const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  avatarURL: String,
  username: String,
});

const model = mongoose.model("users", userSchema);

module.exports = model;
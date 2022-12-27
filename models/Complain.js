const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  userId: { type: String, requied: true },
  userName: { type: String, requied: true },
  complainMessage: { type: String, requied: true },
});

module.exports = mongoose.model("Complain", complainSchema);

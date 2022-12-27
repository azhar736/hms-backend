const mongoose = require("mongoose");
const hostelDetailSchema = new mongoose.Schema({
  breakFastTime: { type: String },
  lunchTime: { type: String },
  dinnerTime: { type: String },
  emergencyContactNumber: { type: Number },
});
module.exports = mongoose.model("HostelDetail", hostelDetailSchema);

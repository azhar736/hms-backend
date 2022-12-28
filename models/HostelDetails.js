const mongoose = require("mongoose");
const hostelDetailSchema = new mongoose.Schema({
  breakFastTime: { type: String, required: true },
  lunchTime: { type: String, required: true },
  dinnerTime: { type: String, required: true },
  emergencyContactNumber: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});
module.exports = mongoose.model("HostelDetail", hostelDetailSchema);

const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  billImage: { type: String, required: true },
  studentId: { type: String },
  totalBill: { type: String },
});
module.exports = mongoose.model("Order", orderSchema);

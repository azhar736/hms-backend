const mongoose = require("mongoose");
const mealSchema = new mongoose.Schema({
  mealName: { type: String, required: true },
  units: { type: Number, required: true },
});
module.exports = mongoose.model("Meal", mealSchema);

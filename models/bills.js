const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Bills", billSchema);

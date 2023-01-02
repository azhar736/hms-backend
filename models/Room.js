const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true,
  },
  bookedByUser: {
    type: String,
  },
  totalSeates: {
    type: Number,
    required: true,
  },
  seatsRemaining: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: [
    {
      type: String,
    },
  ],
  isBooked: { type: Boolean },
});
module.exports = mongoose.model("Room", roomSchema);

const Room = require("../models/Room");
const User = require("../models/user");

const addRoom = async (req, res) => {
  const { totalSeates, seatsRemaining, price, bookedByUser, isBooked } =
    req.body;
  try {
    const newRoom = await new Room({
      totalSeates,
      seatsRemaining,
      price,
      bookedByUser,
      isBooked,
    }).save();
    res.send({ success: true, data: newRoom });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const allRooms = async (req, res) => {
  try {
    const allrooms = await Room.find({});
    res.send({ success: true, data: allrooms });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const singleRoom = async (req, res) => {
  try {
    const allrooms = await Room.findOne({ _id: req.body.id });
    console.log(allrooms);
    res.send({ success: true, data: allrooms });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const updateRoom = async (req, res) => {
  const { totalSeates, seatsRemaining, price, bookedByUser, isBooked, id } =
    req.body;
  try {
    const newRoom = await Room.findByIdAndUpdate(
      id,
      { totalSeates, seatsRemaining, price, bookedByUser, isBooked },
      { new: true }
    );
    res.send({ success: true, data: newRoom });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const bookRoom = async (req, res) => {
  const { bookedByUser, id } = req.body;
  try {
    const bookedRoom = await Room.findByIdAndUpdate(
      id,
      { bookedByUser, isBooked: true },
      { new: true }
    );
    const userUpdated = await User.findByIdAndUpdate(
      bookedByUser,
      { roomId: bookedRoom._id },
      { new: true }
    );
    if (userUpdated && bookedRoom)
      res.send({ success: true, data: bookedRoom });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = { addRoom, allRooms, singleRoom, updateRoom, bookRoom };

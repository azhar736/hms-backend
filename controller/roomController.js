const Room = require("../models/Room");
const User = require("../models/user");

const addRoom = async (req, res) => {
  const {
    totalSeates,
    seatsRemaining,
    price,
    bookedByUser,
    isBooked,
    title,
    description,
    image,
  } = req.body;
  try {
    const newRoom = await new Room({
      totalSeates,
      seatsRemaining,
      price,
      bookedByUser,
      isBooked,
      title,
      description,
    }).save();
    res.send({ success: true, data: newRoom });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const allRooms = async (req, res) => {
  try {
    const allrooms = await Room.find({ isBooked: false });
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
  const {
    totalSeates,
    seatsRemaining,
    price,
    bookedByUser,
    isBooked,
    title,
    description,
    id,
  } = req.body;
  try {
    const newRoom = await Room.findByIdAndUpdate(
      id,
      {
        totalSeates,
        seatsRemaining,
        price,
        bookedByUser,
        isBooked,
        title,
        description,
      },
      { new: true }
    );
    res.send({ success: true, data: newRoom });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};
const bookRoom = async (req, res) => {
  const { bookedByUser, id, noOfseats } = req.body;
  try {
    const bookedRoom = await Room.findByIdAndUpdate(
      id,
      {
        bookedByUser,
        seatsRemaining: bookedRoom.seatsRemaining - noOfseats,
      },
      { new: true }
    );
    if (bookedRoom.totalSeates - bookedRoom.seatsRemaining === 0) {
      const updateRoom = await Room.findByIdAndUpdate(
        id,
        {
          isBooked: true,
        },
        { new: true }
      );
    }
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

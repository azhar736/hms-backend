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
      image,
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
  console.log("THIS IS ROOM ID FOR SINGLE ROOM", req.body);
  try {
    const allrooms = await Room.findOne({ _id: req.body.id });
    if (allrooms) res.send({ success: true, data: allrooms })
    else res.send({ success: false, message: "Room not found"});
    // const delte=await User.deleteMany();
    // if (delte) res.send({ success: true, data: "dfghjkjgfdfghj"})
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
  console.log("The Body Data===",req.body);
  try {
    var room=await Room.findById(id);
    console.log("The Room===",room);
    var { seatsRemaining } = await Room.findOne({ _id: id });
    console.log("The Reamining No of Seats are====", seatsRemaining);
    if (seatsRemaining) {
      console.log(`seatsRemaining: ${seatsRemaining}`);
      var bookedRoom = await Room.findByIdAndUpdate(
        id,
        {
          bookedByUser,
          seatsRemaining: seatsRemaining - noOfseats,
        },
        { new: true }
      );
      if (bookedRoom?.seatsRemaining === 0) {
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
        { roomId: id},
        { new: true }
      );
      console.log("UPDATED USER ::", userUpdated);
      console.log("BOOKED ROOM ::", bookedRoom);
      if (userUpdated && bookedRoom) {
        console.log("user updated AND BOOKED ROOM");
        res.send({ success: true, data: bookedRoom });
      } else {
        console.log("user not updated AND BOOKED ROOM");
        res.send({ success: false, error: "something went wrong" });
      }
    } else {
      res.send({ success: true, message:"Room Already Booked", data:room });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

module.exports = { addRoom, allRooms, singleRoom, updateRoom, bookRoom };

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const HostelDetails = require("../models/HostelDetails");
const Room = require("../models/Room");
const addUser = async (req, res) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    roomId,
    isActive,
    accountType,
  } = req.body;
  console.log(req.body);
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) res.send({ success: false, message: "user already exists" });
    if (password !== confirmPassword)
      res.send({ success: false, message: "password do not match" });
    const newUser = await new User({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      roomId: roomId,
      isActive: isActive,
      accountType: accountType,
    }).save();
    res.send({ success: true, data: newUser });
  } catch (error) {
    console.log(error.message);
    res.send({ success: false, message: "server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      const isMatch = await bcrypt.compare(password, existUser.password);
      if (isMatch) {
        const token = await existUser.generateToken();
        if (token) {
          const { tokens, name, _id } = await User.findOneAndUpdate(
            { email: email },
            { isAuthenticated: true },
            { new: true }
          );

          res.send({
            success: true,
            authToken: tokens[0].token,
            name: name,
            id: _id,
          });
        }
      } else {
        res.send({ success: false, message: "invalid credentials" });
      }
    } else {
      res.send({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ success: false, error: error.message });
  }
};

const logoutUser = async (req, res) => {
  const { id } = req.body;
  try {
    const logout = await User.findByIdAndUpdate(id, {
      isAuthenticated: false,
      tokens: [],
    });
    // const clearToken = await User.findOneAndDelete(id, tokens);
    if (logout) {
      res.send({ success: true, data: "Successfully Logout" });
    }
  } catch (error) {
    console.log(error.message);
    res.send({ success: false, error: error.message });
  }
};
const updateUser = async (req, res) => {
  // const { email, name, password, confirmPassword, roomId, isActive, id } =
  //   req.body;
  try {
    const newUser = await User.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.send({ success: true, data: newUser });
  } catch (error) {
    console.log(error.message);
    res.send({ success: false, message: error.message });
  }
};
const allUsers = async (req, res) => {
  try {
    const allusers = await User.find({});
    console.log(allusers);
    res.send({ success: true, data: allusers });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const singleUser = async (req, res) => {
  const { id } = req.body;
  try {
    const allusers = await User.findOne({ _id: id });
    console.log(allusers);
    if (allusers.length > 0) {
      const room = await Room.findOne({ _id: allusers.roomId });
      const seatNumber = ((room.totalSeates + 1 ) - room.seatsRemaining);
      res.send({ success: true, data: {...allusers,seatNumber} });
    }
    else{
      res.send({ success: false, message:"user not found"})
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const markAttendence = async (req, res) => {
  const { userId, noOfUnits } = req.body;
  var bill = 0;
  try {
    // const { unitPrice } = await HostelDetails.findOne({
    //   unitPrice: { $gt: 0 },
    // });
    const unitPrice = 120;
    const { totalBill } = await User.findOne({ _id: userId });
    if (totalBill === 0) {
      const totalUnit = noOfUnits * unitPrice;
      bill = totalBill + totalUnit;
      const updateUserBill = await User.findByIdAndUpdate(
        userId,
        { totalBill: bill },
        { new: true }
      );
      res.send({ success: true, data: updateUserBill });
    } else {
      bill = totalBill + noOfUnits * unitPrice;
      const updateUserBill = await User.findByIdAndUpdate(
        userId,
        { totalBill: bill },
        { new: true }
      );
      res.send({ success: true, data: updateUserBill });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const billPaid = async (req, res) => {
  // const { billImage } = req.file;
  // const { studenId, totalBill } = req.body;
  try {
  } catch (error) {}
};

const setStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  try {
    const userStatus = await User.findByIdAndUpdate(
      id,
      {
        isActive: status,
      },
      { new: true }
    );

    res.send({ success: true, data: userStatus });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = {
  addUser,
  loginUser,
  logoutUser,
  updateUser,
  singleUser,
  allUsers,
  markAttendence,
  billPaid,
  setStatus,
};

const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
          const logedinuser = await User.findOneAndUpdate(
            { email: email },
            { isAuthenticated: true },
            { new: true }
          );

          res.send({ success: true, data: logedinuser });
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
    res.send({ success: true, data: allusers });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = { addUser, loginUser, updateUser, singleUser, allUsers };

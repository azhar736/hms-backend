const Complain = require("../models/Complain");
const User = require("../models/user");

const makeComplain = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const newComplain = await new Complain({
        userId: user._id,
        userName: user.name,
        complainMessage,
      }).save();
      if (newComplain) res.send({ success: true, data: newComplain });
    }
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const allComplains = async (req, res) => {
  try {
    const allComplains = await Complain.find({});
    if (allComplains) res.send({ success: true, data: allComplains });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = {
  makeComplain,
  allComplains,
};

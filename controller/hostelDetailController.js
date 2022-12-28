const HostelDetails = require("../models/HostelDetails");
const addDetail = async (req, res) => {
  const {
    breakFastTime,
    lunchTime,
    dinnerTime,
    unitPrice,
    emergencyContactNumber,
  } = req.body;
  try {
    const newHostelDetails = await new HostelDetails({
      breakFastTime,
      lunchTime,
      dinnerTime,
      unitPrice,
      emergencyContactNumber,
    }).save();
    if (newHostelDetails) res.send({ success: true, data: newHostelDetails });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const getDetails = async (req, res) => {
  try {
    const allDetails = await HostelDetails.find({});
    if (allDetails) res.send({ success: true, data: allDetails });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

const updateDetail = async (req, res) => {
  const {
    breakFastTime,
    lunchTime,
    dinnerTime,
    emergencyContactNumber,
    unitPrice,
  } = req.body;
  try {
    const deleteDetail = await HostelDetails.deleteMany();
    // res.send(deleteDetail);
    const addnewDetail = await new HostelDetails({
      breakFastTime,
      lunchTime,
      dinnerTime,
      emergencyContactNumber,
      unitPrice,
    }).save();
    res.send(addnewDetail);
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
module.exports = { addDetail, getDetails, updateDetail };

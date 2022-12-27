const HostelDetails = require("../models/HostelDetails");
const addDetail = async (req, res) => {
  const { hostelTimming, emergencyContactNumber } = req.body;
  try {
    const newHostelDetails = await new HostelDetails({
      hostelTimming,
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
module.exports = { addDetail, getDetails };

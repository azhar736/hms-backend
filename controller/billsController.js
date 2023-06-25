const Bills = require("../models/bills");
const submitBill = async (req, res) => {
  const { userId, userName } = req.body;
  //   // getting the image path
  const image = req.file ? `Images/${req.file.filename}` : "";
  console.log("The Body data is==", req.body);
  console.log("The File ====", req.file);
  try {
    const bill=await new Bills({
      userId,
      userName,
      image,
    }).save();

    res.send({ success: true, message:"Your Bill has been Submitted Successfully!" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, error: error.message });
  }
};

const getAllBills = async (req, res) => {
    try {
      const bills = await Bills.find();
      res.send({ success: true,data: bills });
    } catch (error) {
      console.log(error);
      res.send({ success: false, error: error.message });
    }
}

module.exports = { submitBill,getAllBills };

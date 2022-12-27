const router = require("express").Router();
const {
  addDetail,
  getDetails,
} = require("../controller/hostelDetailController");
router.post("/addDetail", addDetail);
router.get("/getDetails", getDetails);
module.exports = router;

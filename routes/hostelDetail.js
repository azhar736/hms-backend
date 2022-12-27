const router = require("express").Router();
const {
  addDetail,
  updateDetail,
  getDetails,
} = require("../controller/hostelDetailController");
router.post("/addDetail", addDetail);
router.patch("/updateDetail", updateDetail);
router.get("/getDetails", getDetails);
module.exports = router;

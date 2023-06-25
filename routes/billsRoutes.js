const router = require("express").Router();
const {submitBill, getAllBills} = require("../controller/billsController");
const Upload = require("../helpers/multer");
  router.post("/submitBill",Upload.single('image'), submitBill);
  router.get("/getAllBills",getAllBills);
module.exports = router;
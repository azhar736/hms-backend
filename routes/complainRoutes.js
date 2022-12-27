const router = require("express").Router();
const {
  makeComplain,
  allComplains,
} = require("../controller/complainController");
router.post("/makeComplain", makeComplain);
router.get("/allComplains", allComplains);
module.exports = router;

const router = require("express").Router();
const {
  addRoom,
  allRooms,
  singleRoom,
  updateRoom,
  bookRoom,
} = require("../controller/roomController");
router.post("/addRoom", addRoom);
router.get("/allRooms", allRooms);
router.post("/singleRoom", singleRoom);
router.put("/updateRoom", updateRoom);
router.post("/bookRoom", bookRoom);
module.exports = router;

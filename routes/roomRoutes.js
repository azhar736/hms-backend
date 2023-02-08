const router = require("express").Router();
const Upload=require("../helpers/multer")
const {
  addRoom,
  allRooms,
  singleRoom,
  updateRoom,
  bookRoom,
} = require("../controller/roomController");
router.post("/addRoom",Upload.single('image'), addRoom);
router.get("/allRooms", allRooms);
router.post("/singleRoom", singleRoom);
router.put("/updateRoom", updateRoom);
router.post("/bookRoom", bookRoom);
module.exports = router;

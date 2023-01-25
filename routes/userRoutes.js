const router = require("express").Router();
const {
  addUser,
  loginUser,
  updateUser,
  allUsers,
  singleUser,
  markAttendence,
  billPaid,
  logoutUser,
  deleteUser,
  setStatus,
} = require("../controller/userController");
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);
router.patch("/updateUser", updateUser);
router.post("/deletUser", deleteUser);
router.get("/allUsers", allUsers);
router.post("/singleUser", singleUser);
router.post("/markAttendence", markAttendence);
router.post("/billPaid", billPaid);
router.patch("/setStatus", setStatus);

module.exports = router;

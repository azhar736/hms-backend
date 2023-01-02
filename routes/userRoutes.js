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
} = require("../controller/userController");
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.post("/logoutUser", logoutUser);
router.patch("/updateUser", updateUser);
router.get("/allUsers", allUsers);
router.get("/singleUser", singleUser);
router.post("/markAttendence", markAttendence);
router.post("/billPaid", billPaid);

module.exports = router;

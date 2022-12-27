const router = require("express").Router();
const {
  addUser,
  loginUser,
  updateUser,
  allUsers,
  singleUser,
} = require("../controller/userController");
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);
router.put("/updateUser", updateUser);
router.get("/allUsers", allUsers);
router.get("/singleUser", singleUser);
module.exports = router;

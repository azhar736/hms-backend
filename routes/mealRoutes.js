const router = require("express").Router();
const {
  addMeal,
  allMeals,
  deleteMeal,
  updateMeal,
} = require("../controller/mealController");
router.post("/addMeal", addMeal);
router.get("/allMeals", allMeals);
router.patch("/updateMeal", updateMeal);
router.delete("/deleteMeal", deleteMeal);
module.exports = router;

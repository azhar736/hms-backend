const router = require("express").Router();
const { addMeal, allMeals } = require("../controller/mealController");
router.post("/addMeal", addMeal);
router.get("/allMeals", allMeals);
module.exports = router;

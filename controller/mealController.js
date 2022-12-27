const Meal = require("../models/Meal");

const addMeal = async (req, res) => {
  const { mealName, units } = req.body;
  try {
    const newMeal = await new Meal({ mealName, units }).save();
    if (newMeal) res.send({ success: true, data: newMeal });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const allMeals = async (req, res) => {
  try {
    const allMeals = await Meal.find({});
    if (allMeals) res.send({ success: true, data: allMeals });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = { addMeal, allMeals };

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

const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (updatedMeal) res.send({ success: true, data: updatedMeal });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
const deleteMeal = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedMeal = await Meal.findByIdAndDelete(id);
    if (deletedMeal) res.send({ success: true, data: deletedMeal });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};

module.exports = { addMeal, allMeals, updateMeal, deleteMeal };

const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const RecipeItem = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for recipe creation
exports.recipeCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeCreateGet");
};
// POST endpoint to create new recipe
exports.recipeCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeCreatePost");
};

// GET a list of all recipes
exports.recipesListGet = function (req, res, next) {
  // Recipe `find` and `findOne` automagically populate `recipeItems` and `item`
  Recipe.find((err, recipes) => {
    if (err) return next(err);
    res.render("recipeList", {
      title: "All Recipes",
      recipes,
    });
  });
};
// GET details of one recipe
exports.recipeDetailGet = function (req, res, next) {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return next(err);
    res.render("recipeDetail", {
      title: "Recipe",
      recipe,
    });
  });
};

// GET form to update recipe
exports.recipeUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeUpdateGet");
};
// POST endpoint to update recipe
exports.recipeUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeUpdatePost");
};

// GET form to delete recipe
exports.recipeDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeDeleteGet");
};
// POST endpoint to delete recipe
exports.recipeDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeDeletePost");
};

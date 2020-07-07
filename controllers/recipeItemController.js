const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const RecipeItem = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for recipeItem creation
exports.recipeItemCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemCreateGet");
};
// POST endpoint to create new recipeItem
exports.recipeItemCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemCreatePost");
};

// GET a list of all recipeItems
exports.recipeItemsListGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemsListGet");
};
// GET details of one recipeItem
exports.recipeItemDetailGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemDetailGet");
};

// GET form to update recipeItem
exports.recipeItemUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemUpdateGet");
};
// POST endpoint to update recipeItem
exports.recipeItemUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemUpdatePost");
};

// GET form to delete recipeItem
exports.recipeItemDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemDeleteGet");
};
// POST endpoint to delete recipeItem
exports.recipeItemDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: recipeItemDeletePost");
};

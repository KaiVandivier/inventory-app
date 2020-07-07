const async = require("async");
const { body, validationResult } = require("express-validator");
const debug = require("debug")("inventory-app:recipeItemController");

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
  RecipeItem.find()
    .populate("item")
    .exec((err, recipeItems) => {
      if (err) return next(err);
      res.render("recipeItemList", {
        title: "All Recipe Items",
        recipeItems,
      });
    });
};
// GET details of one recipeItem
exports.recipeItemDetailGet = function (req, res, next) {
  async.parallel(
    {
      recipeItem: (cb) =>
        RecipeItem.findById(req.params.id)
          .orFail(new Error("Recipe Item not found"))
          .populate("item")
          .exec(cb),
      recipe: (cb) =>
        Recipe.findOne({ recipeItems: req.params.id })
          .orFail(new Error("Recipe not found"))
          .exec(cb),
    },
    (err, { recipeItem, recipe }) => {
      if (err) return next(err);
      res.render("recipeItemDetail", {
        title: "Recipe Item",
        recipeItem,
        recipe,
      });
    }
  );
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

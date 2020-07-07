const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const RecipeItem = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for item creation
exports.itemCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemCreateGet");
};
// POST endpoint to create new item
exports.itemCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemCreatePost");
};

// GET a list of all items
exports.itemsListGet = function (req, res, next) {
  Item.find()
    .populate("category")
    .exec((err, items) => {
      if (err) return next(err);
      res.render("itemList", {
        title: "All Items",
        items,
      });
    });
};

// GET details of one item
exports.itemDetailGet = function (req, res, next) {
  Item.findById(req.params.id)
    .populate("category")
    .exec((err, item) => {
      if (err) return next(err);
      res.render("itemDetail", { title: "Item", item });
    });
};

// GET form to update item
exports.itemUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemUpdateGet");
};
// POST endpoint to update item
exports.itemUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemUpdatePost");
};

// GET form to delete item
exports.itemDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemDeleteGet");
};
// POST endpoint to delete item
exports.itemDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: itemDeletePost");
};

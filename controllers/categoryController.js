const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const Recipecategory = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for category creation
exports.categoryCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryCreateGet")
}
// POST endpoint to create new category
exports.categoryCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryCreatePost")
}

// GET a list of all categories
exports.categoriesListGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoriesListGet")
}
// GET details of one category
exports.categoryDetailGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryDetailGet")
}

// GET form to update category
exports.categoryUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryUpdateGet")
}
// POST endpoint to update category
exports.categoryUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryUpdatePost")
}

// GET form to delete category
exports.categoryDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryDeleteGet")
}
// POST endpoint to delete category
exports.categoryDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryDeletePost")
}

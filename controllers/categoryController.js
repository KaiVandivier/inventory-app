const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");
const Recipecategory = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for category creation
exports.categoryCreateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryCreateGet");
};
// POST endpoint to create new category
exports.categoryCreatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryCreatePost");
};



// GET a list of all categories
exports.categoryListGet = function (req, res, next) {
  Category.find((err, categories) => {
    if (err) return next(err);
    res.render("categoryList", {
      title: "Categories",
      categories,
    })
  })
};

// GET details of one category
exports.categoryDetailGet = function (req, res, next) {
  async.parallel(
    {
      category: (cb) =>
        Category.findById(req.params.id)
          .orFail("Can't find that category")
          .exec(cb),
      categoryItems: (cb) => Item.find({ category: req.params.id }, cb),
    },
    (err, { category, categoryItems }) => {
      if (err) return next(err);
      res.render("categoryDetail", {
        title: "Category",
        category,
        categoryItems,
      });
    }
  );
};



// GET form to update category
exports.categoryUpdateGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryUpdateGet");
};
// POST endpoint to update category
exports.categoryUpdatePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryUpdatePost");
};



// GET form to delete category
exports.categoryDeleteGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryDeleteGet");
};
// POST endpoint to delete category
exports.categoryDeletePost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: categoryDeletePost");
};

const async = require("async");
const { body, validationResult } = require("express-validator");

const Item = require("../models/item");
const Category = require("../models/category");

// Get form for category creation
exports.categoryCreateGet = function (req, res, next) {
  res.render("categoryForm", { title: "Create Category" });
};
// POST endpoint to create new category
exports.categoryCreatePost = [
  // Validate and sanitize fields
  body("name", "Name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  function (req, res, next) {
    const errors = validationResult(req);

    const category = new Category({ ...req.body });

    if (!errors.isEmpty()) {
      // There are errors: rerender form with sanitized data and msgs
      res.render("categoryForm", {
        title: "Create Category",
        category,
        errors: errors.array(),
      });
      return;
    }

    // Otherwise, all good:
    // Check to see if category exists:
    Category.findOne({ name: req.body.name }, (err, foundCategory) => {
      if (err) return next(err);
      if (foundCategory) return res.redirect(foundCategory.url);

      // Otherwise, save new category
      category.save((err) => {
        if (err) return next(err);
        res.redirect(category.url);
      });
    });
  },
];

// GET a list of all categories
exports.categoryListGet = function (req, res, next) {
  Category.find((err, categories) => {
    if (err) return next(err);
    res.render("categoryList", {
      title: "Categories",
      categories,
    });
  });
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
  // Get category to populate form
  Category.findById(req.params.id)
    .orFail("Oops! Category not found.")
    .exec((err, category) => {
      if (err) return next(err);

      res.render("categoryForm", {
        title: "Update Category",
        category,
      });
    });
};
// POST endpoint to update category
exports.categoryUpdatePost = [
  // Validate and sanitize fields
  body("name", "Name is required").trim().isLength({ min: 1 }).escape(),
  body("description", "Description is required")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request
  function (req, res, next) {
    const errors = validationResult(req);

    const category = new Category({ ...req.body, _id: req.params.id });

    if (!errors.isEmpty()) {
      // There are errors: rerender form with sanitized data and msgs
      res.render("categoryForm", {
        title: "Update Category",
        category,
        errors: errors.array(),
      });
      return;
    }

    // Otherwise, all good:
    Category.findByIdAndUpdate(req.params.id, category, (err, newCategory) => {
      if (err) return next(err);
      res.redirect(newCategory.url);
    });
  },
];

// GET form to delete category
exports.categoryDeleteGet = function (req, res, next) {
  Category.findById(req.params.id)
    .orFail(new Error("Category not found"))
    .exec((err, category) => {
      if (err) return next(err);
      res.render("categoryDelete", {
        title: "Delete Category",
        category,
      });
    });
};
// POST endpoint to delete category
exports.categoryDeletePost = [
  body("categoryId", "Must use a valid database ID").isMongoId(),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new Error("Oops! That ID was invalid."));

    Category.deleteOne({ _id: req.body.categoryId }, (err) => {
      if (err) return next(err);
      res.redirect("/categories");
    });
  },
];

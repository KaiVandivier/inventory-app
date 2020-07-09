const async = require("async");
const { body, validationResult } = require("express-validator");
const debug = require("debug")("inventory-app:itemController");

const Item = require("../models/item");
const Category = require("../models/category");
const RecipeItem = require("../models/recipeItem");
const Recipe = require("../models/recipe");

// Get form for item creation
exports.itemCreateGet = async function (req, res, next) {
  // Get categories for form
  Category.find((err, categories) => {
    if (err) return next(err);
    res.render("itemForm", {
      title: "Create Item",
      categories,
    });
  });
};
// POST endpoint to create new item
exports.itemCreatePost = [
  body("name", "Name must not be empty").trim().notEmpty().escape(),
  body("description", "Description must not be empty")
    .trim()
    .notEmpty()
    .escape(),
  body("price", "Price must be a whole number (cents)").isInt({ min: 0 }),
  body("stock", "Stock must be a whole number").isInt({ min: 0 }),
  // Convert category to an array
  body("category").toArray(),

  function (req, res, next) {
    debug(req.body);

    const errors = validationResult(req);

    const item = new Item({ ...req.body });

    if (!errors.isEmpty()) {
      // There are errors - rerender form with errors
      Category.find((err, categories) => {
        if (err) return next(err);

        res.render("itemForm", {
          title: "Create Item",
          item,
          categories,
          errors: errors.array(),
        });
      });
      return;
    }

    // All good - save item and redirect to detail page
    item.save((err) => {
      if (err) return next(err);
      res.redirect(item.url);
    });
  },
];

// GET a list of all items
exports.itemsListGet = function (req, res, next) {
  Item.find()
    .populate("category")
    .sort([["name", "ascending"]])
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
    .orFail(new Error("Item not found"))
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
  // Get item and dependent objects (recipeItems)
  async.parallel(
    {
      item: (cb) =>
        Item.findById(req.params.id)
          .orFail(new Error("Item not found"))
          .exec(cb),
      recipeItems: (cb) =>
        RecipeItem.find({ item: req.params.id }).populate("item").exec(cb),
    },
    (err, { item, recipeItems }) => {
      if (err) return next(err);
      res.render("itemDelete", {
        title: "Delete Item",
        item,
        recipeItems,
      });
    }
  );
};
// POST endpoint to delete item
exports.itemDeletePost = [
  // Validate id
  body("itemId").isMongoId(),

  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Oops! Something went wrong with the item ID.");
      return next(err);
    }
    Item.deleteOne({ _id: req.body.itemId }, (err) => {
      if (err) return next(err);
      res.redirect("/items");
    })
  },
];

const express = require('express');
const router = express.Router();

const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");
const recipeController = require("../controllers/recipeController");
const recipeItemController = require("../controllers/recipeItemController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Inventory App' });
});

/**
 * ITEM routes
 */
// `Create` routes go first because of parameters!
router.get("/item/create", itemController.itemCreateGet);
router.post("/item/create", itemController.itemCreatePost);

router.get("/items", itemController.itemsListGet);
router.get("/item/:id", itemController.itemDetailGet);

router.get("/item/:id/update", itemController.itemUpdateGet);
router.post("/item/:id/update", itemController.itemUpdatePost);

router.get("/item/:id/delete", itemController.itemDeleteGet);
router.post("/item/:id/delete", itemController.itemDeletePost);

/**
 * CATEGORY routes
 */
router.get("/category/create", categoryController.categoryCreateGet);
router.post("/category/create", categoryController.categoryCreatePost);

router.get("/categories", categoryController.categoriesListGet);
router.get("/category/:id", categoryController.categoryDetailGet);

router.get("/category/:id/update", categoryController.categoryUpdateGet);
router.post("/category/:id/update", categoryController.categoryUpdatePost);

router.get("/category/:id/delete", categoryController.categoryDeleteGet);
router.post("/category/:id/delete", categoryController.categoryDeletePost);

/**
 * RECIPE routes
 */
router.get("/recipe/create", recipeController.recipeCreateGet);
router.post("/recipe/create", recipeController.recipeCreatePost);

router.get("/recipes", recipeController.recipesListGet);
router.get("/recipe/:id", recipeController.recipeDetailGet);

router.get("/recipe/:id/update", recipeController.recipeUpdateGet);
router.post("/recipe/:id/update", recipeController.recipeUpdatePost);

router.get("/recipe/:id/delete", recipeController.recipeDeleteGet);
router.post("/recipe/:id/delete", recipeController.recipeDeletePost);

/**
 * RECIPE ITEM routes
 */
router.get("/recipeItem/create", recipeItemController.recipeItemCreateGet);
router.post("/recipeItem/create", recipeItemController.recipeItemCreatePost);

router.get("/recipeItems", recipeItemController.recipeItemsListGet);
router.get("/recipeItem/:id", recipeItemController.recipeItemDetailGet);

router.get("/recipeItem/:id/update", recipeItemController.recipeItemUpdateGet);
router.post("/recipeItem/:id/update", recipeItemController.recipeItemUpdatePost);

router.get("/recipeItem/:id/delete", recipeItemController.recipeItemDeleteGet);
router.post("/recipeItem/:id/delete", recipeItemController.recipeItemDeletePost);



module.exports = router;

const express = require('express');
const router = express.Router();

const itemController = require("../controllers/itemController");
const categoryController = require("../controllers/categoryController");

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

router.get("/categories", categoryController.categoryListGet);
router.get("/category/:id", categoryController.categoryDetailGet);

router.get("/category/:id/update", categoryController.categoryUpdateGet);
router.post("/category/:id/update", categoryController.categoryUpdatePost);

router.get("/category/:id/delete", categoryController.categoryDeleteGet);
router.post("/category/:id/delete", categoryController.categoryDeletePost);


module.exports = router;

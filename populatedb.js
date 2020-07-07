#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/* if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid mongodb URL as the first argument"
  );
  return;
} */

const async = require("async");

const Item = require("./models/item");
const Category = require("./models/category");
const Recipe = require("./models/recipe");
const RecipeItem = require("./models/recipeItem");
const { devDbUrl } = require("./config");

const mongoose = require("mongoose");
const recipeItem = require("./models/recipeItem");
const mongoDB = userArgs[0] || devDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];
const categories = [];
const recipes = [];
const recipeItems = [];

function categoryCreate(name, description, cb) {
  const category = new Category({ name, description });

  category.save((err) => {
    if (err) return cb(err, null);

    console.log("New category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, price, stock, category, cb) {
  const item = new Item({ name, description, price, stock, category });
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function recipeItemCreate(item, quantity, cb) {
  const recipeItem = new RecipeItem({ item, quantity });
  recipeItem.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New recipeItem: " + recipeItem);
    recipeItems.push(recipeItem);
    cb(null, recipeItem);
  });
}

function recipeCreate(name, description, recipeItems, cb) {
  const recipe = new Recipe({ name, description, recipeItems });

  recipe.save(function (err) {
    if (err) {
      console.log("ERROR CREATING Recipe: " + recipe);
      cb(err, null);
      return;
    }
    console.log("New recipe: " + recipe);
    recipes.push(recipe);
    cb(null, recipe);
  });
}

function createCategories(cb) {
  async.series(
    [
      (cb) => categoryCreate("Produce", "Fresh fruits and vegetables", cb),
      (cb) => categoryCreate("Herbs, Spices, and Seasoning", "Fresh, dry, and ground herbs, spices, and salts", cb),
      (cb) => categoryCreate("Canned Goods", "Preserved fruits and vegetables", cb),
      (cb) => categoryCreate("Baked Goods", "Bread, tortillas, muffins, cakes, and more", cb),
      (cb) => categoryCreate("Cereals", "Boxed breakfast cereals and dry oats", cb),
      (cb) => categoryCreate("Dry Goods", "Beans, rice, pasta, and other dry grains", cb),
    ],
    cb // optional callback
  );
}

function createItems(cb) {
  async.series(
    [
      // Index 0:
      (cb) =>
        itemCreate("Avocado", "Yummy avocado!", 149, 5, [categories[0]], cb),
      (cb) => itemCreate("Lime", "Yummy lime!", 49, 15, [categories[0]], cb),
      (cb) =>
        itemCreate(
          "Cilantro (Coriander), Fresh Bunch",
          "So fresh!",
          149,
          7,
          [categories[1]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Himalayan Salt",
          "Complements everything!",
          199,
          5,
          [categories[1]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Coriander, Ground",
          "Adds some kick!",
          299,
          5,
          [categories[1]],
          cb
        ),
      // Index 5:
      (cb) =>
        itemCreate(
          "Sweet Potato",
          "Sweet and tender!",
          89,
          20,
          [categories[0]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Tomato, Canned, Diced",
          "Lil' chunks of tomato!",
          99,
          12,
          [categories[2]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Cannelini Beans, Canned",
          "Yummy avocado!",
          99,
          15,
          [categories[2]],
          cb
        ),
      // Index 8:
      (cb) =>
        itemCreate(
          "Jasmine Rice, Brown",
          "Nutritious!",
          199,
          20,
          [categories[5]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Bell Pepper, Red",
          "Crisp and sweet!",
          79,
          12,
          [categories[0]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Jalapeno Peppers",
          "Flavorful and hot!",
          149,
          5,
          [categories[0]],
          cb
        ),
      // Index 11:
      (cb) =>
        itemCreate(
          "Cumin, Ground",
          "Adds flavor!",
          299,
          5,
          [categories[1]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Cinnamon, Ground",
          "Great for breakfast and mexican cuisine!",
          299,
          12,
          [categories[1]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Onion, Red",
          "Crisp and zingy!",
          79,
          9,
          [categories[0]],
          cb
        ),
      (cb) =>
        itemCreate(
          "Olive Oil, Extra Virgin",
          "Adds richness!",
          799,
          11,
          [categories[1]],
          cb
        ),
      // Index 15:
      (cb) =>
        itemCreate(
          "Smoked Paprika, Ground",
          "Savory!",
          199,
          8,
          [categories[1]],
          cb
        ),
    ],
    cb
  );
}

function createRecipeItems(cb) {
  async.series(
    [
      // Guacamole
      (cb) => recipeItemCreate(items[0], 4, cb), // 4 avocados
      (cb) => recipeItemCreate(items[1], 2, cb), // 2 limes
      (cb) => recipeItemCreate(items[2], 1, cb), // 1 cilantro
      (cb) => recipeItemCreate(items[3], 4, cb), // 1 salt
      (cb) => recipeItemCreate(items[4], 4, cb), // 1 cilantro, ground
      (cb) => recipeItemCreate(items[13], 4, cb), // 1 onion
      // Chilli
      (cb) => recipeItemCreate(items[5], 2, cb), // 2 sweet potatos
      (cb) => recipeItemCreate(items[6], 1, cb), // 1 can tomato
      (cb) => recipeItemCreate(items[7], 1, cb), // 1 can cannelini beans
      (cb) => recipeItemCreate(items[9], 2, cb), // 2 red bell peppers
      (cb) => recipeItemCreate(items[10], 1, cb), // 1 jalapeno peppers
      (cb) => recipeItemCreate(items[11], 1, cb), // 1 ground cumin
      (cb) => recipeItemCreate(items[12], 1, cb), // 1 ground cinnamon
      (cb) => recipeItemCreate(items[13], 1, cb), // 1 onion
      (cb) => recipeItemCreate(items[14], 1, cb), // 1 olive oil
      (cb) => recipeItemCreate(items[15], 1, cb), // 1 smoked paprika
    ],
    cb
  );
}

function createRecipes(cb) {
  async.series(
    [
      (cb) =>
        recipeCreate(
          "Best Guacamole",
          "More delicious than you've ever had before!",
          recipeItems.slice(0, 6),
          cb
        ),
      (cb) =>
        recipeCreate(
          "Sweet Potato Chilli",
          "Created by Jamie Oliver - Vegan and delicious!",
          recipeItems.slice(6),
          cb
        ),
    ],
    cb
  );
}

async.series(
  [createCategories, createItems, createRecipeItems, createRecipes],
  (err, results) => {
    if (err) console.log("FINAL ERR: ", err);
    else console.log("Recipes: ", recipes);
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

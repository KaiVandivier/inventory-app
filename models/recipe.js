const { model, Schema } = require("mongoose");
const debug = require("debug")("inventory-app:recipe");

const recipeSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  recipeItems: [{ type: Schema.Types.ObjectId, ref: "RecipeItem" }],
});

// Middlewares to populate recipe items on queries:
recipeSchema.pre("find", function (next) {
  this.populate({
    path: "recipeItems",
    populate: { path: "item" },
  });
  next();
});
recipeSchema.pre("findOne", function (next) {
  this.populate({
    path: "recipeItems",
    populate: { path: "item" },
  });
  next();
});

// Virtual for recipe's URL
recipeSchema.virtual("url").get(function () {
  return `/recipe/${this._id}`;
});

// Virtual for total recipe price
recipeSchema.virtual("price").get(function () {
  const total = this.recipeItems.reduce((sum, recipeItem) => {
    return sum + recipeItem.item.price * recipeItem.quantity;
  }, 0);
  return `$${Math.floor(total / 100)}.${String(total % 100).padStart(2, "0")}`;
});

// Export model for use
module.exports = model("Recipe", recipeSchema);

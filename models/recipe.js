const { model, Schema } = require("mongoose");
const debug = require("debug")("recipe");

const recipeSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  recipeItems: [{ type: Schema.Types.ObjectId, ref: "RecipeItem" }],
});

// Middlewares to populate recipe items on queries:
recipeSchema.pre("find", function (next) {
  this.populate({ 
    path: "recipeItems",
    populate: { path: "item" }
  });
  next();
});
recipeSchema.pre("findOne", function (next) {
  this.populate({ 
    path: "recipeItems",
    populate: { path: "item" }
  });
  next();
});

// Virtual for recipe's URL
recipeSchema.virtual("url").get(function () {
  return `/recipe/${this._id}`;
});

// Virtual for total recipe price
recipeSchema.virtual("price").get(function () {
  const totalPrice = this.recipeItems.reduce((sum, recipeItem) => {
    return sum + recipeItem.item.price * recipeItem.quantity
  })
  debug("Recipe items inside a virtual: ", this.recipeItems);
})

// Export model for use
module.exports = model("Recipe", recipeSchema);

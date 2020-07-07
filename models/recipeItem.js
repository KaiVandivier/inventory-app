const { model, Schema } = require("mongoose");

// Schema for a food item
const recipeItemSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, required: true, min: 0 },
});

// Virtual for item's URL
recipeItemSchema.virtual("url").get(function () {
  return `/recipeItem/${this._id}`;
});

// Export model for use
module.exports = model("RecipeItem", recipeItemSchema);

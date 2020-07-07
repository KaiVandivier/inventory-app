const { model, Schema } = require("mongoose");

// Schema for a food item
const itemSchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

// Virtual for item's URL
itemSchema.virtual("url").get(function () {
  return `/item/${this._id}`;
});

// Virtual to format price
itemSchema.virtual("priceFormatted").get(function () {
  return `$${Math.floor(
    this.price / 100
  )}.${String(this.price % 100).padStart(2, "0")}`;
});

// Export model for use
module.exports = model("Item", itemSchema);

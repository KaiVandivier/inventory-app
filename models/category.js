const { model, Schema } = require("mongoose");

// Schema for a food item category
const categorySchema = new Schema({
  name: { type: String, required: true, minlength: 1 },
  description: { type: String, required: true, minlength: 1 },
});

// Virtual for category's URL
categorySchema.virtual("url").get(function () {
  return `/category/${this._id}`;
});

// Export model for use
module.exports = model("Category", categorySchema);

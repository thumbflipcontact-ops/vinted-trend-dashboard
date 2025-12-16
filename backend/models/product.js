const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  vintedId: String,
  title: String,
  price: Number,
  brand: String,
  category: String,
  subcategory: String,
  url: String,
  firstSeen: {
    type: Date,
    default: Date.now
  },
  lastSeen: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", ProductSchema);

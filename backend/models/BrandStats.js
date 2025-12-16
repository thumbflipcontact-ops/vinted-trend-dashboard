const mongoose = require("mongoose");

const BrandStatsSchema = new mongoose.Schema({
  brand: String,
  count: Number
});

module.exports = mongoose.model("BrandStats", BrandStatsSchema);

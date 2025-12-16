const express = require("express");
const Product = require("../models/Product");
const BrandStats = require("../models/BrandStats");

const router = express.Router();

// ✅ Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(100)
      .lean(); // no sort = no crash

    res.json(products);
  } catch (err) {
    console.error("Products API error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Brands (FIX)
router.get("/brands", async (req, res) => {
  try {
    const brands = await BrandStats.find({})
      .sort({ count: -1 })
      .limit(20);

    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

module.exports = router;

const { chromium } = require("playwright");
const Product = require("../models/Product");
const BrandStats = require("../models/BrandStats");

async function fetchVintedData() {
  console.log("Launching browser for Vinted scrape...");

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
  });

  const page = await context.newPage();
  await page.goto("https://www.vinted.com", { waitUntil: "networkidle" });

  const cookies = await context.cookies();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join("; ");

  const response = await page.request.get(
    "https://www.vinted.com/api/v2/catalog/items?page=1&per_page=50",
    {
      headers: {
        Cookie: cookieHeader,
        Accept: "application/json"
      }
    }
  );

  const data = await response.json();
  const items = data.items || [];

  for (const item of items) {
    await Product.findOneAndUpdate(
      { vintedId: item.id },
      {
        vintedId: item.id,
        title: item.title,
        price: item.price?.amount ?? null,
        currency: item.price?.currency ?? "EUR",
        brand:
          item.brand_title && item.brand_title.trim()
            ? item.brand_title.trim()
            : "Unknown",
        category: "Unknown", // ← SAFE fallback
        url: item.url,
        lastSeen: new Date()
      },
      { upsert: true }
    );
  }

  const brands = await Product.aggregate([
    { $match: { brand: { $ne: "Unknown" } } },
    { $group: { _id: "$brand", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 }
  ]);

  await BrandStats.deleteMany({});
  await BrandStats.insertMany(
    brands.map(b => ({ brand: b._id, count: b.count }))
  );

  console.log(`Vinted data updated: ${items.length} items`);
  await browser.close();
}

module.exports = { fetchVintedData };

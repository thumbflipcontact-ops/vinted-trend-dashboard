const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cron = require("node-cron");
const apiRoutes = require("./routes/api");
const { fetchVintedData } = require("./scraper/vintedApi");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://mongo:27017/vinted", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");

    // 🔥 RUN SCRAPER ON STARTUP
    fetchVintedData();
  });

app.use("/api", apiRoutes);

// 🔁 RUN EVERY 30 MINUTES
cron.schedule("*/30 * * * *", () => {
  console.log("Running scheduled Vinted scrape...");
  fetchVintedData();
});

app.listen(5000, () => {
  console.log("Server up");
});

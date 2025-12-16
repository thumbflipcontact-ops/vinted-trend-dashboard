const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://mongo:27017/vinted", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
module.exports = mongoose;

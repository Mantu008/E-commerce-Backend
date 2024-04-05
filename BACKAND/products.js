const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  userId: String,
  company: String,
});

const products = new mongoose.model("products", productSchema);

module.exports = products;

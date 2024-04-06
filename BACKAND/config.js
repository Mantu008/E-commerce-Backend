const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect("mongodb://localhost:27017/e-commerce-demo")
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });

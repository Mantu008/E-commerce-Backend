const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://mantu000:mantu000@cluster0.eewb1ul.mongodb.net/e-commerce-demo"
  )
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });

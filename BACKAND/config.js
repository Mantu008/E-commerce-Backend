const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://mantu000:mantu000@cluster0.eewb1ul.mongodb.net/e-commerce-demo?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });

const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.MONGU_URL)
  .then(() => {
    console.log("database connected sucessfully....");
  })
  .catch((err) => {
    console.log(err);
  });

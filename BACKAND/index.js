const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./config");
const user = require("./users");
const products = require("./products");
const Jwt = require("jsonwebtoken");
const JwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

//routes for userns collection which handle login-logout

//this is for login
app.post("/login", async (req, resp) => {
  const data = await user.findOne(req.body).select("-password");
  if (data) {
    Jwt.sign({ data }, JwtKey, { expiresIn: "2h" }, (err, token) => {
      if (!err) {
        resp.send({ data, auth: token });
      }
    });
  } else {
    resp.send(JSON.stringify({ data: false }));
  }
});

//this api is for signup
app.post("/register", async (req, resp) => {
  try {
    if (req.body) {
      // Insert multiple documents
      let ans = await user.create(req.body);
      let result = ans.toObject();
      delete result.password;
      if (result) {
        Jwt.sign({ result }, JwtKey, { expiresIn: "2h" }, (err, token) => {
          if (!err) {
            resp.send({ result, auth: token });
          }
        });
      }
    }
  } catch (error) {
    resp.status(500).send("Internal Server Error");
  }
});

//routes for products collection which handle products

//this api is for add-product
app.post("/add-product", verifyTocken, async (req, resp) => {
  try {
    if (req.body) {
      // Insert multiple documents
      let ans = await products.create(req.body);
    }
    resp.send(await products.find());
  } catch (error) {
    resp.status(500).send("Internal Server Error");
  }
});

//this api is getting the product
app.post("/get-products", verifyTocken, async (req, resp) => {
  const data = await products.find(req.body);
  if (!data) {
    resp.send(JSON.stringify({ resp: false }));
  } else {
    resp.send(data);
  }
});

//this api is for deleting the product
app.delete("/delete-product/:id", verifyTocken, async (req, resp) => {
  const data = await products.deleteOne({ _id: req.params.id });
  resp.send(data);
});

//this api is for get product that is updating to its given id
app.get("/getUpdateproduct/:id", verifyTocken, async (req, resp) => {
  const data = await products.findOne({ _id: req.params.id });
  if (data) {
    resp.send(data);
  } else {
    resp.send({ resp: false });
  }
});

//this api is for updating the specfic product to the given id
app.put("/update-product/:id", verifyTocken, async (req, resp) => {
  const data = await products.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(data);
});

//this api is for search the product
app.get("/search/:key", verifyTocken, async (req, resp) => {
  const result = await products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

//i am working in that particular api further..

// app.get("/getall/:key", async (req, resp) => {
//   const id = "660c0c7f4dd6856c8252142a";
//   let data = await products.find({ userId: id });
//   if (data) {
//     const result = await products.find({
//       $or: [
//         { name: { $regex: req.params.key } },
//         { company: { $regex: req.params.key } },
//         { category: { $regex: req.params.key } },
//       ],
//     });
//     resp.send(result);
//   }
//   resp.send(data);
// });

//middleware for JWT

function verifyTocken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, JwtKey, (err, valid) => {
      if (!err) {
        next();
      } else {
        resp.status(401).send({ result: "Plese Provide Valid Token" });
      }
    });
  } else {
    resp.status(403).send({ result: "Plese add Token with Hadder" });
  }
}

app.listen(process.env.PORT, () =>
  console.log("Server is running on Port [ http://localhost:3000 ]")
);

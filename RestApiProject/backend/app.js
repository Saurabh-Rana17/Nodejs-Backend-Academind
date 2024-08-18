const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const path = require("path");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  console.log(err);
  return res.status(status).json({ message, data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/RestDb")
  .then(() => {
    console.log("connected to db");
    app.listen(8080, () => {
      console.log("listning on port 8080");
    });
  })
  .catch((err) => console.log(err));

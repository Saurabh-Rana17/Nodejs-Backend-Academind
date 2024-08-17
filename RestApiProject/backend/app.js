const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
  // console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;

  return res.status(status).json({ message });
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

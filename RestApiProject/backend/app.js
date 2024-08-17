const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(cors());
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
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

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();

app.use(cors());
// app.use(bodyParser.urlEncoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
  return res
    .status(500)
    .json({ message: "something went wrong", data: "data is" + err });
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

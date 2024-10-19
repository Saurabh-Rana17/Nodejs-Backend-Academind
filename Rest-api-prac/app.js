const express = require("express");
const feedRouter = require("./routes/feed");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/feeds", feedRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "something went wrong",
    success: "false",
    data: err.message,
  });
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});

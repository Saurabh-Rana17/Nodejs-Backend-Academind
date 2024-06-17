import express from "express";

const app = express();

app.get("/favicon.ico", (req, res, next) => {});

app.use("/users", (req, res, next) => {
  console.log("mw1", req.url);
  res.send("hello users");
});

app.use((req, res, next) => {
  console.log("mw2", req.url);
  res.send("hello home");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

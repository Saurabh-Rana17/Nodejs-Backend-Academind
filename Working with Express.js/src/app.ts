import express, { NextFunction, Request, Response } from "express";

const app = express();

app.get(
  "/favicon.ico",
  (req: Request, res: Response, next: NextFunction) => {}
);

app.use((req, res, next) => {
  console.log("this always run");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("add-product");

  res.send("not home ");
});

app.use("/", (req, res, next) => {
  console.log(req.url);
  res.send("404");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

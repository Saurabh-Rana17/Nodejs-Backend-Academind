import express from "express";
import * as path from "path";
import rootDir from "../utils/path";

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;

import express from "express";
import * as path from "path";
import rootDir from "../utils/path";

const router = express.Router();
const products: string[] = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", { title: "Add Product Page" });
});

router.post("/add-product", (req, res) => {
  products.push(req.body.title);
  res.redirect("/");
});

export { products };
export default router;

import * as path from "path";
import express from "express";
import { products } from "./admin";

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(products);
  res.render("shop");
});

export default router;

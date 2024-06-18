import express from "express";
import { getAddproduct, postAddProduct } from "../controllers/product";

const router = express.Router();

router.get("/add-product", getAddproduct);

router.post("/add-product", postAddProduct);

export default router;

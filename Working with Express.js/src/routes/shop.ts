import express from "express";
import { getCart, getIndex, getProducts } from "../controllers/shop";
const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/cart", getCart);
router.get("/checkout");

export default router;

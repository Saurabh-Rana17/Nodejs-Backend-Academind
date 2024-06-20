import express from "express";
import {
  getCart,
  getIndex,
  getOrders,
  getProduct,
  getProducts,
  postCart,
} from "../controllers/shop";
const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:prodId", getProduct);
router.get("/cart", getCart);
router.post("/cart", postCart);
router.get("/orders", getOrders);
router.get("/checkout");

export default router;

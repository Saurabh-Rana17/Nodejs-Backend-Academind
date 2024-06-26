import express from "express";
import {
  getCart,
  getIndex,
  getOrders,
  getProduct,
  getProducts,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from "../controllers/shop";
import isAuth from "../middlewares/is-auth";
const router = express.Router();

router.get("/", getIndex);
router.get("/products", getProducts);
router.get("/products/:prodId", getProduct);
router.get("/cart", isAuth, getCart);
router.post("/cart", isAuth, postCart);
router.post("/cart-delete-item", isAuth, postCartDeleteProduct);
router.get("/orders", isAuth, getOrders);
router.post("/create-order", isAuth, postOrder);
// router.get("/checkout");

export default router;

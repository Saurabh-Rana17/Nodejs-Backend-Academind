import express from "express";
import {
  getAddproduct,
  getAdminProducts,
  postAddProduct,
} from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddproduct);
router.post("/add-product", postAddProduct);
router.get("/products", getAdminProducts);

export default router;

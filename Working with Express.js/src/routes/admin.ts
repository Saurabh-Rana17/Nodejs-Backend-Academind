import express from "express";
import {
  getAddproduct,
  getAdminProducts,
  getEditProduct,
  postAddProduct,
  postDeleteProduct,
  postEditProduct,
} from "../controllers/admin";
import isAuth from "../middlewares/is-auth";
import { body } from "express-validator";

const router = express.Router();

router.get("/add-product", isAuth, getAddproduct);
router.post("/add-product", isAuth, [body("")], postAddProduct);
router.get("/edit-product/:id", isAuth, getEditProduct);
router.post("/edit-product", isAuth, postEditProduct);
router.post("/delete-product/:id", isAuth, postDeleteProduct);
router.get("/products", isAuth, getAdminProducts);

export default router;

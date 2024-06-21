import express from "express";
import {
  getAddproduct,
  //   getAdminProducts,
  //   getEditProduct,
  postAddProduct,
  //   postDeleteProduct,
  //   postEditProduct,
} from "../controllers/admin";

const router = express.Router();

router.get("/add-product", getAddproduct);
router.post("/add-product", postAddProduct);
// router.get("/edit-product/:id", getEditProduct);
// router.post("/edit-product", postEditProduct);
// router.post("/delete-product/:id", postDeleteProduct);
// router.get("/products", getAdminProducts);

export default router;

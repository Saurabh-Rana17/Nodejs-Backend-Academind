import { Request, Response } from "express";
import { Product } from "../models/product";

export const getAddproduct = (req: Request, res: Response) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

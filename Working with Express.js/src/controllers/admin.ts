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
  interface Body {
    title: string;
    imageUrl: string;
    price: number;
    description: string;
  }
  const { title, imageUrl, price, description }: Body = req.body;
  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect("/");
};

export const getAdminProducts = (req: Request, res: Response) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

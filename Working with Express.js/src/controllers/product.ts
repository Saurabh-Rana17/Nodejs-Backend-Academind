import { Request, Response } from "express";

export const products: { title: string }[] = [];

export const getAddproduct = (req: Request, res: Response) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

export const postAddProduct = (req: Request, res: Response) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

export const getProducts = (req: Request, res: Response) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

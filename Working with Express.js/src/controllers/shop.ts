import { Request, Response } from "express";
import { Product } from "../models/product";

export const getProducts = (req: Request, res: Response) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Shop",
      path: "/products",
    });
  });
};

export const getIndex = (req: Request, res: Response) => {
  res.render("shop/index", { pageTitle: "Home", path: "/" });
};

export const getCart = (req: Request, res: Response) => {
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

export const getAdminProducts = (req: Request, res: Response) => {
  res.render("admin/products", { pageTitle: "Cart", path: "/admin/products" });
};

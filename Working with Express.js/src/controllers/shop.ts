import { Request, Response } from "express";
import { Product } from "../models/product";

export const getProducts = (req: Request, res: Response) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

export const getIndex = (req: Request, res: Response) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Home",
      path: "/",
    });
  });
};

export const getCart = (req: Request, res: Response) => {
  res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};

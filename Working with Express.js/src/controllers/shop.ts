import { Request, Response } from "express";
import { Product } from "../models/product";
import { IProduct } from "../types/product";
import { Cart } from "../models/cart";

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

export const postCart = (req: Request, res: Response) => {
  const id: string = req.body.productId;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

export const getOrders = (req: Request, res: Response) => {
  res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};

export const getProduct = (req: Request, res: Response) => {
  const prodId: string = req.params.prodId;
  Product.findById(prodId, (product: IProduct) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

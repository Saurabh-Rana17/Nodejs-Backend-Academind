import { Request, Response } from "express";

// import { userReq } from "../types/user";
import Product from "../models/product";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

export const getIndex = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Home",
    path: "/",
  });
};

// export const getCart = async (req: userReq, res: Response) => {
//   const cartProduct = await req.user?.getCart();
//   res.render("shop/cart", {
//     pageTitle: "Cart",
//     path: "/cart",
//     products: cartProduct,
//   });
// };

// export const postCart = async (req: userReq, res: Response) => {
//   const id: string = req.body.productId;
//   const product = await Product.findById(id);
//   const user = req.user;
//   await user?.addToCart(product as unknown as IProduct);

//   res.redirect("/cart");
// };

// export const getOrders = async (req: userReq, res: Response) => {
//   const orders = await req.user?.getOrders();

//   res.render("shop/orders", {
//     pageTitle: "Your Orders",
//     path: "/orders",
//     orders: orders,
//   });
// };

export const getProduct = async (req: Request, res: Response) => {
  const prodId = req.params.prodId;
  const product = await Product.findById(prodId);
  res.render("shop/product-detail", {
    pageTitle: product?.title,
    path: "/products",
    product: product,
  });
};

// export const postCartDeleteProduct = async (req: userReq, res: Response) => {
//   const id: string = req.body.productId;
//   await req.user?.deleteItemFromCart(id);
//   res.redirect("/cart");
// };

// export const postOrder = async (req: userReq, res: Response) => {
//   await req.user?.addOrder();
//   res.redirect("/orders");
// };

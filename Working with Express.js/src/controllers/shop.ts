import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Order, { IOrder } from "../models/order";
import { HydratedDocument } from "mongoose";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find();

  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const getIndex = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Home",
    path: "/",
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const getCart = async (req: Request, res: Response) => {
  // const cartProduct = await req.user?.getCart();
  const cartProduct = await req.session.user.populate("cart.items.productId");
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
    products: req.session.user.cart.items,
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const postCart = async (req: Request, res: Response) => {
  const id: string = req.body.productId;
  const product = await Product.findById(id);
  const user = req.session.user;
  await user?.addToCart(product);

  res.redirect("/cart");
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ "user.userId": req.session.user._id });
  // const orders = await Order.find().populate("products.product");
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
    orders: orders,
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const getProduct = async (req: Request, res: Response) => {
  const prodId = req.params.prodId;
  const product = await Product.findById(prodId);

  res.render("shop/product-detail", {
    pageTitle: product?.title,
    path: "/products",
    product: product,
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const postCartDeleteProduct = async (req: Request, res: Response) => {
  const id: string = req.body.productId;
  const updatedCartItem = req.session.user.cart.items.filter(
    (i: any) => i.productId.toString() !== id.toString()
  );
  req.session.user.cart.items = updatedCartItem;
  await req.session.user.save();

  res.redirect("/cart");
};

export const postOrder = async (req: Request, res: Response) => {
  const order: HydratedDocument<IOrder> = new Order();
  const ans = await req.session.user.populate("cart.items.productId");
  const userProducts: { productId: IProduct; quantity: number }[] =
    ans.cart.items;
  let orderProduct: { product: IProduct; quantity: number }[] = [];
  userProducts.forEach((p) => {
    orderProduct.push({
      product: {
        ...p.productId.toJSON(),
      },
      quantity: p.quantity,
    });
  });
  order.products = orderProduct;
  order.user.userId = req.session.user._id;
  order.user.name = req.session.user.name;
  await order.save();
  req.session.user.cart.items = [];
  await req.session.user.save();

  res.redirect("/orders");
};

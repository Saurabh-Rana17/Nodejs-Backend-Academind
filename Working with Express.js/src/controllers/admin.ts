import { Request, Response, response } from "express";
import Product, { IProduct } from "../models/product";
import { HydratedDocument } from "mongoose";

interface Body {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
}

export const getAddproduct = (req: Request, res: Response) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const postAddProduct = async (req: Request, res: Response) => {
  const { title, imageUrl, price, description }: Body = req.body;
  const product: HydratedDocument<IProduct> = new Product({
    title: title,
    description,
    imageUrl,
    price,
    userid: req.session.user,
    // isLoggedIn: req.session.isLoggedIn,
  });
  await product.save();

  res.redirect("/");
};

export const getEditProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  const product = await Product.findById(id);

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
    isLoggedIn: req.session.isLoggedIn,
  });
};

export const postEditProduct = async (req: Request, res: Response) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = await Product.findByIdAndUpdate(id, req.body);
  // if (product) {
  //   product.title = title;
  //   product.imageUrl = imageUrl;
  //   product.price = price;
  //   product.description = description;
  //   product.save();
  // }

  res.redirect("/admin/products");
};

export const postDeleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/admin/products");
};

export const getAdminProducts = async (req: Request, res: Response) => {
  const products = await Product.find();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
    isLoggedIn: req.session.isLoggedIn,
  });
};

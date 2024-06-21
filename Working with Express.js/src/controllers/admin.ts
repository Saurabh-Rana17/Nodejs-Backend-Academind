import { Request, Response, response } from "express";
import { Product } from "../models/product";
import { Cart } from "../models/cart";

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
  });
};

export const postAddProduct = async (req: Request, res: Response) => {
  const { title, imageUrl, price, description }: Body = req.body;
  const product = new Product(title, price, description, imageUrl);

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
  });
};

export const postEditProduct = async (req: Request, res: Response) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl, id);
  await product.save();
  res.redirect("/admin/products");
};

export const postDeleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Product.deleteById(id);
  res.redirect("/admin/products");
};

export const getAdminProducts = async (req: Request, res: Response) => {
  const products = await Product.fetchAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

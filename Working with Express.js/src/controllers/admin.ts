import { Request, Response, response } from "express";
import { Product } from "../models/product";

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

export const postAddProduct = (req: Request, res: Response) => {
  const { title, imageUrl, price, description }: Body = req.body;
  const product = new Product(null, title, imageUrl, price, description);

  product.save();

  res.redirect("/");
};

export const getEditProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  Product.findById(id, (product) => {
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

export const postEditProduct = (req: Request, res: Response) => {
  const { id, title, imageUrl, price, description } = req.body;
  const product = new Product(id, title, imageUrl, price, description);
  product.save();
  res.redirect("/admin/products");
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

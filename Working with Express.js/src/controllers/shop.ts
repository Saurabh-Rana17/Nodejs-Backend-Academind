import { Request, Response } from "express";
import { Product } from "../models/product";
import { IProduct } from "../types/product";
import { Cart } from "../models/cart";
import { ObjectId } from "mongodb";

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.fetchAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};

export const getIndex = async (req: Request, res: Response) => {
  const products = await Product.fetchAll();
  res.render("shop/index", {
    prods: products,
    pageTitle: "Home",
    path: "/",
  });
};

// export const getCart = (req: Request, res: Response) => {
//   Cart.getProducts((cart) => {
//     Product.fetchAll((products) => {
//       const cartProduct = [];
//       for (let product of products) {
//         if (cart?.products.find((p) => p.id === product.id)) {
//           cartProduct.push({
//             productData: product,
//             qty: cart.products.find((el) => el.id === product.id)?.qty,
//           });
//         }
//       }
//       res.render("shop/cart", {
//         pageTitle: "Cart",
//         path: "/cart",
//         products: cartProduct,
//       });
//     });
//   });
// };

// export const postCart = (req: Request, res: Response) => {
//   const id: string = req.body.productId;
//   Product.findById(id, (product) => {
//     Cart.addProduct(id, product.price);
//   });
//   res.redirect("/cart");
// };

// export const getOrders = (req: Request, res: Response) => {
//   res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
// };

export const getProduct = async (req: Request, res: Response) => {
  const prodId = req.params.prodId;
  const product = await Product.findById(prodId);
  res.render("shop/product-detail", {
    pageTitle: product!.title,
    path: "/products",
    product: product,
  });
};

// export const postCartDeleteProduct = (req: Request, res: Response) => {
//   const id: string = req.body.id;
//   Product.findById(id, (product) => {
//     Cart.deleteProduct(id, product.price);
//     res.redirect("/cart");
//   });
// };

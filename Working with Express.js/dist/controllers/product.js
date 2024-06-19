"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddproduct = void 0;
const product_1 = require("../models/product");
const getAddproduct = (req, res) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};
exports.getAddproduct = getAddproduct;
const postAddProduct = (req, res) => {
    const product = new product_1.Product(req.body.title);
    product.save();
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
const getProducts = (req, res) => {
    product_1.Product.fetchAll((products) => {
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
};
exports.getProducts = getProducts;

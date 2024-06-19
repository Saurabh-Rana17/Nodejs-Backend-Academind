"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.getCart = exports.getIndex = exports.getProducts = void 0;
const product_1 = require("../models/product");
const getProducts = (req, res) => {
    product_1.Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/products",
        });
    });
};
exports.getProducts = getProducts;
const getIndex = (req, res) => {
    res.render("shop/index", { pageTitle: "Home", path: "/" });
};
exports.getIndex = getIndex;
const getCart = (req, res) => {
    res.render("shop/cart", { pageTitle: "Cart", path: "/cart" });
};
exports.getCart = getCart;
const getAdminProducts = (req, res) => {
    res.render("admin/products", { pageTitle: "Cart", path: "/admin/products" });
};
exports.getAdminProducts = getAdminProducts;

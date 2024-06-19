"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.postAddProduct = exports.getAddproduct = exports.products = void 0;
exports.products = [];
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
    exports.products.push({ title: req.body.title });
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
const getProducts = (req, res) => {
    res.render("shop", {
        prods: exports.products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: exports.products.length > 0,
        activeShop: true,
        productCSS: true,
    });
};
exports.getProducts = getProducts;

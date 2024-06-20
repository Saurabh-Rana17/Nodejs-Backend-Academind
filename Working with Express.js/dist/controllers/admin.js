"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminProducts = exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddproduct = void 0;
const product_1 = require("../models/product");
const getAddproduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};
exports.getAddproduct = getAddproduct;
const postAddProduct = (req, res) => {
    const { title, imageUrl, price, description } = req.body;
    const product = new product_1.Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect("/");
};
exports.postAddProduct = postAddProduct;
const getEditProduct = (req, res) => {
    const id = req.params.id;
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    product_1.Product.findById(id, (product) => {
        res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product,
        });
    });
};
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res) => {
    const { id, title, imageUrl, price, description } = req.body;
    const product = new product_1.Product(id, title, imageUrl, price, description);
    product.save();
    res.redirect("/admin/products");
};
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res) => {
    const id = req.params.id;
    product_1.Product.deleteById(id);
    res.redirect("/admin/products");
};
exports.postDeleteProduct = postDeleteProduct;
const getAdminProducts = (req, res) => {
    product_1.Product.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products",
        });
    });
};
exports.getAdminProducts = getAdminProducts;

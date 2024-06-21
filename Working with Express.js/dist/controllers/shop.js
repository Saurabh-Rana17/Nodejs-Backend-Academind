"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCartDeleteProduct = exports.getProduct = exports.getOrders = exports.postCart = exports.getCart = exports.getIndex = exports.getProducts = void 0;
const product_1 = require("../models/product");
const cart_1 = require("../models/cart");
const getProducts = (req, res) => {
    product_1.Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/products",
        });
    });
};
exports.getProducts = getProducts;
const getIndex = (req, res) => {
    product_1.Product.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Home",
            path: "/",
        });
    });
};
exports.getIndex = getIndex;
const getCart = (req, res) => {
    cart_1.Cart.getProducts((cart) => {
        product_1.Product.fetchAll((products) => {
            var _a;
            const cartProduct = [];
            for (let product of products) {
                if (cart === null || cart === void 0 ? void 0 : cart.products.find((p) => p.id === product.id)) {
                    cartProduct.push({
                        productData: product,
                        qty: (_a = cart.products.find((el) => el.id === product.id)) === null || _a === void 0 ? void 0 : _a.qty,
                    });
                }
            }
            res.render("shop/cart", {
                pageTitle: "Cart",
                path: "/cart",
                products: cartProduct,
            });
        });
    });
};
exports.getCart = getCart;
const postCart = (req, res) => {
    const id = req.body.productId;
    product_1.Product.findById(id, (product) => {
        cart_1.Cart.addProduct(id, product.price);
    });
    res.redirect("/cart");
};
exports.postCart = postCart;
const getOrders = (req, res) => {
    res.render("shop/orders", { pageTitle: "Orders", path: "/orders" });
};
exports.getOrders = getOrders;
const getProduct = (req, res) => {
    const prodId = req.params.prodId;
    console.log("ingetprod", prodId);
    product_1.Product.findById(prodId, (product) => {
        res.render("shop/product-detail", {
            pageTitle: product.title,
            path: "/products",
            product: product,
        });
    });
};
exports.getProduct = getProduct;
const postCartDeleteProduct = (req, res) => {
    const id = req.body.id;
    product_1.Product.findById(id, (product) => {
        cart_1.Cart.deleteProduct(id, product.price);
        res.redirect("/cart");
    });
};
exports.postCartDeleteProduct = postCartDeleteProduct;

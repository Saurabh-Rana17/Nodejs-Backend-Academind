"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = exports.postCartDeleteProduct = exports.getProduct = exports.getOrders = exports.postCart = exports.getCart = exports.getIndex = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const order_1 = __importDefault(require("../models/order"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
    });
});
exports.getProducts = getProducts;
const getIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find();
    res.render("shop/index", {
        prods: products,
        pageTitle: "Home",
        path: "/",
        csrfToken: req.csrfToken(),
    });
});
exports.getIndex = getIndex;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield req.user.populate("cart.items.productId");
    const cartProduct = [];
    cart.cart.items.forEach((i) => {
        if (i.productId) {
            cartProduct.push(i);
        }
    });
    res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProduct,
    });
});
exports.getCart = getCart;
const postCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.productId;
    const product = yield product_1.default.findById(id);
    const user = req.user;
    const ans = yield user.addToCart(product);
    res.redirect("/cart");
});
exports.postCart = postCart;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default.find({ "user.userId": req.session.user._id });
    res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
        orders: orders,
    });
});
exports.getOrders = getOrders;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodId = req.params.prodId;
    const product = yield product_1.default.findById(prodId);
    res.render("shop/product-detail", {
        pageTitle: product === null || product === void 0 ? void 0 : product.title,
        path: "/products",
        product: product,
    });
});
exports.getProduct = getProduct;
const postCartDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.productId;
    const updatedCartItem = req.user.cart.items.filter((i) => i.productId.toString() !== id.toString());
    req.user.cart.items = updatedCartItem;
    yield req.user.save();
    res.redirect("/cart");
});
exports.postCartDeleteProduct = postCartDeleteProduct;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new order_1.default();
    const ans = yield req.user.populate("cart.items.productId");
    const userProducts = ans.cart.items;
    let orderProduct = [];
    userProducts.forEach((p) => {
        var _a;
        orderProduct.push({
            product: Object.assign({}, (_a = p.productId) === null || _a === void 0 ? void 0 : _a.toJSON()),
            quantity: p.quantity,
        });
    });
    order.products = orderProduct;
    order.user.userId = req.user._id;
    order.user.email = req.user.email;
    yield order.save();
    req.user.cart.items = [];
    yield req.user.save();
    res.redirect("/orders");
});
exports.postOrder = postOrder;

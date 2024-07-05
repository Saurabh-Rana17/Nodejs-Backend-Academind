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
exports.getAdminProducts = exports.postDeleteProduct = exports.postEditProduct = exports.getEditProduct = exports.postAddProduct = exports.getAddproduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAddproduct = (req, res) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};
exports.getAddproduct = getAddproduct;
const postAddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, imageUrl, price, description } = req.body;
    const product = new product_1.default({
        title: title,
        description,
        imageUrl,
        price,
        userid: req.user,
    });
    yield product.save();
    res.redirect("/");
});
exports.postAddProduct = postAddProduct;
const getEditProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const product = yield product_1.default.findById(id);
    res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
    });
});
exports.getEditProduct = getEditProduct;
const postEditProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, title, imageUrl, price, description } = req.body;
    const product = yield product_1.default.findById(productId);
    if (product) {
        if (product.userid.toString() !== req.user._id.toString()) {
            return res.redirect("/");
        }
        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;
        product.save();
    }
    res.redirect("/admin/products");
});
exports.postEditProduct = postEditProduct;
const postDeleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield product_1.default.deleteOne({ _id: id, userid: req.user._id });
    res.redirect("/admin/products");
});
exports.postDeleteProduct = postDeleteProduct;
const getAdminProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.default.find({ userid: req.user._id });
    res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
    });
});
exports.getAdminProducts = getAdminProducts;

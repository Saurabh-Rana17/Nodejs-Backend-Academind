"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = [];
exports.products = products;
router.get("/add-product", (req, res, next) => {
    res.render("add-product", { title: "Add Product Page" });
});
router.post("/add-product", (req, res) => {
    products.push(req.body.title);
    res.redirect("/");
});
exports.default = router;

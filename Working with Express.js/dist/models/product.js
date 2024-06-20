"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const cart_1 = require("./cart");
const p = path.join(__dirname, "..", "data", "data.json");
function getAllProductFromFile(cb) {
    fs.readFile(p, (err, data) => {
        let products = [];
        if (!err) {
            products = JSON.parse(data);
        }
        cb(products);
    });
}
class Product {
    constructor(id, title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.id = id;
    }
    save() {
        getAllProductFromFile((products) => {
            if (!this.id) {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => { });
            }
            else {
                const existingIndex = products.findIndex((el) => el.id === this.id);
                products[existingIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
            }
        });
    }
    static deleteById(id) {
        getAllProductFromFile((products) => {
            const updatedProducts = products.filter((el) => el.id !== id);
            const productToDelete = products.find((el) => el.id === id);
            const productPrice = +productToDelete.price;
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    cart_1.Cart.deleteProduct(id, productPrice);
                }
            });
        });
    }
    static fetchAll(cb) {
        getAllProductFromFile(cb);
    }
    static findById(id, cb) {
        getAllProductFromFile((products) => {
            const product = products.find((p) => p.id === id);
            cb(product);
        });
    }
}
exports.Product = Product;

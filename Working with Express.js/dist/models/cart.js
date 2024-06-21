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
exports.Cart = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const p = path.join(__dirname, "..", "data", "cart.json");
class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(data);
                const productIndex = cart.products.findIndex((el) => el.id === id);
                let updatedCart = Object.assign({}, cart);
                if (productIndex < 0) {
                    cart.products.push({ id: id, qty: 1 });
                    cart.totalPrice += +productPrice;
                    fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
                }
                else {
                    let item = updatedCart.products[productIndex];
                    item.qty = item.qty + 1;
                    updatedCart.products[productIndex] = item;
                    updatedCart.totalPrice += +productPrice;
                    fs.writeFile(p, JSON.stringify(updatedCart), (err) => console.log(err));
                }
            }
            else {
                cart.products.push({ id: id, qty: 1 });
                cart.totalPrice = +productPrice;
                fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
            }
        });
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);
            const productToDelete = cart.products.find((el) => el.id === id);
            if (!productToDelete) {
                console.log("does not exist in cart");
                return;
            }
            const updatedProducts = cart.products.filter((el) => el.id !== id);
            const productQuantity = productToDelete.qty;
            cart.products = updatedProducts;
            cart.totalPrice = cart.totalPrice - productPrice * productQuantity;
            fs.writeFile(p, JSON.stringify(cart), (err) => console.log(err));
        });
    }
    static getProducts(cb) {
        fs.readFile(p, (err, data) => {
            const cart = JSON.parse(data);
            if (err) {
                cb(null);
            }
            else {
                cb(cart);
            }
        });
    }
}
exports.Cart = Cart;

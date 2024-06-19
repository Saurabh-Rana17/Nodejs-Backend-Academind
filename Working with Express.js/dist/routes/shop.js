"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_1 = require("../controllers/shop");
const router = express_1.default.Router();
router.get("/", shop_1.getIndex);
router.get("/products", shop_1.getProducts);
router.get("/cart", shop_1.getCart);
router.get("/checkout");
exports.default = router;

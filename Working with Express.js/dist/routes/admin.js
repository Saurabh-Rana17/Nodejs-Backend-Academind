"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shop_1 = require("../controllers/shop");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
router.get("/add-product", admin_1.getAddproduct);
router.post("/add-product", admin_1.postAddProduct);
router.get("/products", shop_1.getAdminProducts);
exports.default = router;

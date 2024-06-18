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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express_1.default.static(path.join(__dirname, "..", "public")));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/admin", admin_1.default);
app.use(shop_1.default);
app.use((req, res) => {
    res.status(404).render("404", { title: "404,Page Not Found" });
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});

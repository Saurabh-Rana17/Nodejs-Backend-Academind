"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/admin", admin_1.default);
app.use(shop_1.default);
app.use((req, res) => {
    res.status(404).send("<h1>Page Not Found</h1>");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});

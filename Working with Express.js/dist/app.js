"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/favicon.ico", (req, res, next) => { });
app.use((req, res, next) => {
    console.log("this always run");
    next();
});
app.use("/add-product", (req, res, next) => {
    console.log("add-product");
    res.send("not home ");
});
app.use("/", (req, res, next) => {
    console.log(req.url);
    res.send("404");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/favicon.ico", (req, res, next) => { });
app.use("/users", (req, res, next) => {
    console.log("mw1", req.url);
    res.send("hello users");
});
app.use((req, res, next) => {
    console.log("mw2", req.url);
    res.send("hello home");
});
app.listen(3000, () => {
    console.log("listening on port 3000");
});

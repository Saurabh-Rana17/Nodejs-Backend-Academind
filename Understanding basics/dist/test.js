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
console.clear();
const http = __importStar(require("http"));
const server = http.createServer((req, res) => {
    const { url, method } = req;
    if (url === "/") {
        res.write("<h1 style='color:green'>Node form</h1>");
        res.write("<form method='POST' action='/create-user' > <input name='user' /><button>submit</button> </form>");
        return res.end();
    }
    if (url === "/users") {
        res.write("<body>");
        res.write("<ul>");
        res.write("<li>User 1 </li>");
        res.write("<li>User 2 </li>");
        res.write("<li>User 3 </li>");
        res.write("<li>User 4 </li>");
        res.write("</ul>");
        res.write("</body>");
        return res.end();
    }
    if (url === "/create-user" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const data = parsedBody.split("=")[1];
            console.log(data);
            res.statusCode = 302;
            res.setHeader("Location", "/");
            return res.end();
        });
    }
    res.write("<h1>404-Page not found</h1>");
    res.end();
});
server.listen(3000, () => {
    console.log("listening on port 3000");
});

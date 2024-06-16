"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    const { headers, url, method } = req;
    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>Form</title></head>");
        res.write("<body> <form method='POST' action='/message' > <input name='message' type='text'> <button type='submit'>Send </button>   </form> </body>");
        res.write("</html>");
        return res.end();
    }
    if (url === "/message" && method === "POST") {
        res.write("<h1  >Welcome to message page</h1>");
        res.end();
    }
});
server.listen(3000);

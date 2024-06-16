"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
var http = require("http");
var routes_1 = require("./routes");
var server = http.createServer(routes_1.requestHandler);
server.listen(3000, function () {
    console.log("listening on port 3000");
});

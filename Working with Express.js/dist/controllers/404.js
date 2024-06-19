"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => {
    res
        .status(404)
        .render("404", { pageTitle: "404,Page Not Found", path: "404" });
};
exports.notFound = notFound;

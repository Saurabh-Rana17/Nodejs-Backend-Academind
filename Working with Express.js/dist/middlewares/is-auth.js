"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuth(req, res, next) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    next();
}
exports.default = isAuth;

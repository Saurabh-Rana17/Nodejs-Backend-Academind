import { Request, Response } from "express";
import User from "../models/user";

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postLogin = async (req: Request, res: Response) => {
  const user = await User.findById("667945078a6d9b03d68182b6");
  req.session.user = user;
  req.session.isLoggedIn = true;
  req.session.save(() => {
    res.redirect("/");
  });
};

export const postLogout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};

export const getSignup = (req: Request, res: Response) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  const doesExist = await User.findOne({ email: email });
  if (doesExist) {
    return res.redirect("/signup");
  }
  const user = new User({
    cart: { items: [] },
    email: email,
    password: password,
  });
  await user.save();
  res.redirect("/login");
};

import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

export const getLogin = (req: Request, res: Response) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
  });
};

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.redirect("/login");
  }
  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.user = user;
      req.session.isLoggedIn = true;
      return req.session.save(() => {
        res.redirect("/");
      });
    }
    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/login");
  }
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
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  const doesExist = await User.findOne({ email: email });
  if (doesExist) {
    return res.redirect("/signup");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({
    cart: { items: [] },
    email: email,
    password: hashedPassword,
  });
  await user.save();
  res.redirect("/login");
};

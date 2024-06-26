import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { error } from "console";

export const getLogin = (req: Request, res: Response) => {
  let message: string[] | string = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = "";
  }

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message,
  });
};

export const postLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    req.flash("error", "invalid email or password");
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
    req.flash("error", "invalid email or password");
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
  let message: string[] | string = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = "";
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

export const postSignup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;
  const doesExist = await User.findOne({ email: email });
  if (doesExist) {
    req.flash("error", "email exist already ");
    console.log("exist");
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

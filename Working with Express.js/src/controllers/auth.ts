import { Request, Response } from "express";

// interface req extends Session extends Request  {

// }

export const getLogin = (req: Request, res: Response) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    path: "login",
    pageTitle: "Login",
    isLoggedIn: false,
  });
};

export const postLogin = (req: Request, res: Response) => {
  req.session.isLoggedIn = true;
  res.redirect("/");
};

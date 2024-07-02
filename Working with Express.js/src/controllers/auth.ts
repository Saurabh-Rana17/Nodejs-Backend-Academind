import * as crypto from "crypto";
import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.APP_PASS,
  },
});

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

  const mailOptions: MailOptions = {
    from: {
      name: "Saurabh Rana",
      address: process.env.SENDER_MAIL!,
    },
    to: email,
    subject: "sending mail using node mailer",
    text: "this is a text",
    html: "<b>Your new  Account Created</b>",
  };

  res.redirect("/login");
  // try {
  //   const resp = await transport.sendMail(mailOptions);
  // } catch (error) {
  //   console.log("email resp", error);
  // }
};

export const getReset = (req: Request, res: Response) => {
  let message: string[] | string = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = "";
  }

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Signup",
    errorMessage: message,
  });
};

export const postReset = async (req: Request, res: Response) => {
  const email = req.body.email;
  crypto.randomBytes(32, async (error, buffer) => {
    if (error) {
      console.log(error);
      return res.redirect("/reset");
    }
    const token = buffer.toString("hex");
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash("error", "No Account with that email found");
      return res.redirect("/reset");
    }
    const now = new Date();
    user.resetToken = token;
    user.resetTokenExpiration = new Date(now.getTime() + 1000 * 60 * 60);
    await user.save();

    res.redirect("/");

    try {
      transport.sendMail({
        from: {
          name: "Shop Node",
          address: process.env.SENDER_MAIL!,
        },
        to: email,
        subject: "Password reset",
        text: "this is a text",
        html: `
        <p> You Requested a Password Reset </p>
        <p> Click this  <a href="http://localhost:3000/reset/${token}"> link </a>  to set a new password </p>
        `,
      });
    } catch (error) {
      console.log("error");
    }
  });
};

export const getNewPassword = async (req: Request, res: Response) => {
  let message: string[] | string = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = "";
  }
  const token = req.params.token;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  });

  res.render("auth/new-password", {
    path: "/new-password",
    pageTitle: "New Password",
    errorMessage: message,
    userId: user?._id.toString(),
    passwordToken: token,
  });
};

export const postNewPassword = async (req: Request, res: Response) => {
  const { userId, password: newPassword, passwordToken } = req.body;
  try {
    const user = await User.findOne({
      resetToken: passwordToken,
      _id: userId,
      resetTokenExpiration: {
        $gt: Date.now(),
      },
    });
    const hashPass = await bcrypt.hash(newPassword, 12);
    if (user) {
      user.password = hashPass;
      user.resetToken = null;
      user.resetTokenExpiration = null;
      await user.save();

      return res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

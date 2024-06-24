import * as path from "path";
import express, { NextFunction, Request } from "express";
import "dotenv/config";

const app = express();

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { notFound } from "./controllers/404";
import { userReq } from "./types/user";
import mongoose from "mongoose";
import User from "./models/user";

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.use(async (req: userReq, res, next: NextFunction) => {
  const user = await User.findById("66780e36dbb2c1a52e8cd2d5");
  if (user) {
    req.user = user;
  }
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(notFound);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connected to db");
    const user = await User.findOne();
    if (!user) {
      const newUser = new User({
        name: "saurabh",
        email: "saurabh@gmail.com",
        cart: { items: [] },
      });

      newUser.save();
    }

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

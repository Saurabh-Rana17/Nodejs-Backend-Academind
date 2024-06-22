import * as path from "path";
import express, { NextFunction, Request } from "express";
import "dotenv/config";

const app = express();

import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { notFound } from "./controllers/404";
import { mongoConnect } from "./utils/db";
import User from "./models/user";
import { userReq } from "./types/user";
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));

app.use(async (req: userReq, res, next: NextFunction) => {
  const user = await User.findById("6676bdad69f5a1fbfee4968a");
  if (user) {
    let newUser = new User(user.name, user.email, user.cart, user._id);
    req.user = newUser;
  }
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(notFound);

const startServer = async () => {
  await mongoConnect();

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startServer();

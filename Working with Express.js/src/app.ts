import * as path from "path";
import express, { NextFunction, Request } from "express";
import "dotenv/config";
const app = express();

import authRoutes from "./routes/auth";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import { notFound } from "./controllers/404";
import mongoose from "mongoose";
import User from "./models/user";
import session, { Store } from "express-session";
import "./types/express-session";
import "./types/express";
import ConnectMongoDBSession, { MongoDBStore } from "connect-mongodb-session";

const mongoDBStore = ConnectMongoDBSession(session);

const store: MongoDBStore = new mongoDBStore({
  collection: "sessions",
  uri: process.env.MONGO_LOCAL!,
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "my secret key",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(async (req: Request, res, next: NextFunction) => {
  const user = await User.findById("667945078a6d9b03d68182b6");
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
    await mongoose.connect(process.env.MONGO_LOCAL!);
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

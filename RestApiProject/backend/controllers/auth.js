const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error("validation failed");
    err.statusCode = 422;
    err.data = errors.array();
    return next(err);
  }
  const { email, name, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashPassword });
    const response = await user.save();
    return res
      .status(200)
      .json({ message: "user created", userId: response._id });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Account not created");
      err.statusCode = 404;
      return next(err);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("wrong email or password");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretkey",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token, userId: user._id.toString() });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

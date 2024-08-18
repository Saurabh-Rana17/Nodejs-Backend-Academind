const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
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

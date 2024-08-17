const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    next(new Error(error).message);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validaton failed entered data is incorrect");
    error.statusCode = 422;
    return next(error);
  }
  const title = req.body.title;
  const content = req.body.content;

  try {
    const post = new Post({
      title: title,
      content: content,
      imageUrl: "images/img1.jpg",
      creator: {
        name: "post creator",
      },
    });
    const result = await post.save();

    return res.status(201).json({
      message: "Post created successfully!",
      post: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const { validationResult } = require("express-validator");
const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res
      .status(200)
      .json({ message: "fetched post successfully", posts });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
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

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  console.log("postid is", postId);

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error("Did not found any post ");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({ message: "Post fetched successfullt", post });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    return next(error);
  }
};

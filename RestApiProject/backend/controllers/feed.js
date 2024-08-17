const { validationResult } = require("express-validator");
const Post = require("../models/post");
const clearFile = require("../utils/clearFile");

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
  if (!req.file) {
    const error = new Error("no image provided");
    error.statusCode = 422;
    return next(error);
  }

  try {
    const post = new Post({
      title: title,
      content: content,
      imageUrl: req.file.path.replace("\\", "/"),
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

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validaton failed entered data is incorrect");
    error.statusCode = 422;
    return next(error);
  }
  const postId = req.params.postId;
  let { title, content } = req.body;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path.replace("\\", "/");
  }
  if (!imageUrl) {
    const err = new Error("no file selected");
    err.statusCode = 422;
    return next(err);
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("post does not exist");
      err.statusCode = 404;
      return next(err);
    }

    if (post.imageUrl !== imageUrl) {
      clearFile(post.imageUrl);
    }
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const updatedPost = await post.save();
    return res
      .status(200)
      .json({ message: "Updated successfully", post: updatedPost });
  } catch (error) {
    if (!error.statusCode) {
      err.statusCode = 500;
    }
    return next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  console.log("delete route reached");
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("post does not exist");
      err.statusCode = 404;
      return next(err);
    }
    clearFile(post.imageUrl);
    const result = await Post.findByIdAndDelete(postId);
    return res
      .status(200)
      .json({ message: "post deleted successfully", result });
  } catch (err) {
    if (err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

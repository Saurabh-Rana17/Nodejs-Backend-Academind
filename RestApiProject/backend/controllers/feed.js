const { validationResult } = require("express-validator");
const Post = require("../models/post");
const clearFile = require("../utils/clearFile");
const User = require("../models/user");

exports.getPosts = async (req, res, next) => {
  const page = req.query.page || 1;
  const perPage = 4;

  try {
    const totalItems = await Post.find().countDocuments();
    const posts = await Post.find()
      .populate("creator", " name")
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({
      message: "fetched post successfully",
      posts,
      totalItems: totalItems,
    });
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
  const userId = req.userId;

  try {
    const post = new Post({
      title: title,
      content: content,
      imageUrl: req.file.path.replace("\\", "/"),
      creator: userId,
    });
    const result = await post.save();
    const user = await User.findById(userId);
    user.posts.push(post);
    const updatedUser = await user.save();

    return res.status(201).json({
      message: "Post created successfully!",
      post: result,
      creator: { _id: updatedUser._id, name: updatedUser.name },
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
    if (post.creator.toString() !== req.userId) {
      const err = new Error("Not authorized");
      err.statusCode = 403;
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
      error.statusCode = 500;
    }
    return next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("post does not exist");
      err.statusCode = 404;
      return next(err);
    }
    if (post.creator.toString() !== req.userId) {
      const error = new Error("not authorized");
      error.statusCode = 403;
      return next(error);
    }
    clearFile(post.imageUrl);
    const result = await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();
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

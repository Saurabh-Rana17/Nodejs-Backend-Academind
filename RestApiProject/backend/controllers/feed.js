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
    return res.status(422).json({
      message: "validation fail",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db

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
    next(new Error(error).message);
  }
};

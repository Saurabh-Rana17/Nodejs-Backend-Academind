exports.getPosts = (req, res, next) => {
  return res.status(200).json({
    posts: [{ title: "First post", content: "first post content" }],
  });
};

exports.createPost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    throw new Error("title not set");
  }
  res.status(201).json({
    message: "post created successfully",
    post: { id: new Date().toISOString(), title, content },
  });
};

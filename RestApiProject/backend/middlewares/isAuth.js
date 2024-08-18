const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("user is not authenticated");
    error.statusCode = 401;
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretkey");
  } catch (error) {
    error.statusCode = 500;
    return next(error);
  }
  if (!decodedToken) {
    const err = new Error("Not authenticated");
    err.statusCode = 401;
    return next(err);
  }

  req.userId = decodedToken.userId;
  next();
};

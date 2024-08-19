const User = require("../models/user");

exports.getStatus = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("user does not exist");
      err.statusCode = 404;
      return next(err);
    }

    const status = user.status;
    return res
      .status(200)
      .json({ message: "status fetched successfully", status });
  } catch (error) {
    return next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  const { status } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("user not found");
      err.statusCode = 404;
      return next(err);
    }
    user.status = status;
    const updatedUser = await user.save();
    return res.status(201).json({
      message: "status upadted successfully",
      status: updatedUser.status,
    });
  } catch (error) {
    return next(error);
  }
};

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

// function to filter out unwanted fields which is used in updateMyAccount
function filterObj(obj, ...allowedFields) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}

exports.getAllusers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // Check if the user exists and delete
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({
    status: "success",
    message: "User deleted successfully",
  });
});

exports.updateMyAccount = catchAsync(async (req, res, next) => {
  // 1) Create an error if user tries to update password
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updatePassword.",
        400
      )
    );
  }

  // 2) Filter out unwanted fields
  // added photo
  const filteredBody = filterObj(req.body, "name", "email", "photo");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMyAccount = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

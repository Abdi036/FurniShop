const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

// Function to generate token
const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);
  return token;
};

exports.Signup = catchAsync(async (req, res, next) => {
  // 1. Create user
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: req.body.role,
    verificationToken,
  });

  // 2. Send verification email
  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verify/${verificationToken}`;
  const message = `Please verify your email by clicking the following link: ${verificationURL}`;
  const htmlMessage = `<p>Please verify your email by clicking the link below:</p><a href="${verificationURL}">Verify Email</a>`;
  await sendEmail({
    email: newUser.email,
    subject: "Email Verification - Furnishop",
    text: message,
    html: htmlMessage,
  });

  res.status(201).json({
    status: "success",
    message:
      "Signup successful! Please check your email to verify your account.",
    data: {
      user: newUser,
    },
  });
});

// Email verification handler
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return next(new AppError("Invalid or expired verification token", 400));
  }
  user.verified = true;
  user.verificationToken = undefined;
  await user.save({ validateBeforeSave: false });
  // Redirect to frontend success page
  return res.redirect("http://localhost:5173/email-verified");
});

exports.Login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("No user with this email!", 404));
  }

  if (!user.verified) {
    return next(
      new AppError("Please verify your email before logging in.", 401)
    );
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken(res, user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid token. Please log in again.", 401));
  }

  const currentUser = await User.findById(decoded._id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("User not found!", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://localhost:5173/resetPassword/${resetToken}`;

  const textMessage = `If you forgot your password, click the link below to reset it: ${resetURL}.\nIf you didn't request this, please ignore this email.`;

  const htmlMessage = `
    <p>If you forgot your password, click the link below to reset it:</p>
    <a href="${resetURL}">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      text: textMessage,
      html: htmlMessage,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = generateToken(res, user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");
  // 2) Check if the posted current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Current password is incorrect", 401));
  }

  // 3) Update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // 4) Log user in, send JWT
  const token = generateToken(res, user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

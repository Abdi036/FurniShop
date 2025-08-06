const express = require("express");
// files
const {
  Signup,
  Login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  verifyEmail,
} = require("../middleware/authController");
const {
  deleteUser,
  getAllusers,
  updateMyAccount,
  deleteMyAccount,
} = require("../controllers/userController");

const { uploadUserPhoto, resizeUserPhoto } = require("../models/userModel");
const router = express.Router();

// auth

router.post("/signup", Signup);
router.get("/verify/:token", verifyEmail);
router.post("/login", Login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updatePassword", protect, updatePassword);

router.get("/getAllusers", protect, restrictTo("admin"), getAllusers);
router.delete("/deleteUser/:id", protect, restrictTo("admin"), deleteUser);
router.patch(
  "/updateMyAccount",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMyAccount
);
router.delete("/deleteMyAccount", protect, deleteMyAccount);

module.exports = router;

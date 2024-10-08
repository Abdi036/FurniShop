const express = require("express");
// Files
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, restrictTo } = require("../middleware/authController");
const {
  uploadProductPhoto,
  resizeProductPhoto,
} = require("../models/productModel");
const router = express.Router();

// Public routes
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProduct);

// Protected routes (Admin only)
router.post(
  "/createProduct",
  protect,
  restrictTo("admin"),
  uploadProductPhoto,
  resizeProductPhoto,
  createProduct
);
router.patch("/updateProduct/:id", protect, restrictTo("admin"), updateProduct);
router.delete(
  "/deleteProduct/:id",
  protect,
  restrictTo("admin"),
  deleteProduct
);

module.exports = router;

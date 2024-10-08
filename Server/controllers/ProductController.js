const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Create a new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

// Get all products
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

// Get a single product by ID
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

// Update a product by ID
exports.updateProduct = catchAsync(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product: updatedProduct,
    },
  });
});

// Delete a product by ID
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

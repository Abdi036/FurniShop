const mongoose = require("mongoose");
const sharp = require("sharp");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Product must have a description"],
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"],
  },
  quantity: {
    type: Number,
    required: [true, "Product must have a quantity"],
    min: [0, "Quantity must be equal to or greater than 0"],
  },
  category: {
    type: String,
    required: [true, "Product must belong to a category"],
  },
  photo: {
    type: String,
    default: "default-product.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Multer storage setup for product image upload
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

productSchema.statics.uploadProductPhoto = upload.single("photo");

// Middleware to handle image processing for products
productSchema.statics.resizeProductPhoto = async function (req, res, next) {
  if (!req.file) return next();

  const productDir = path.join(__dirname, "../productImages");
  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  req.file.filename = `product-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(800, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${productDir}/${req.file.filename}`);

  req.body.photo = req.file.filename;
  next();
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

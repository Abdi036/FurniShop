const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const xss = require("xss-clean");
const mongosanitize = require("express-mongo-sanitize");
const compression = require("compression");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// files
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const errorMiddleware = require("./controllers/errorController");

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// NOSQL quiery injection protection
app.use(mongosanitize());
app.use(xss());

app.use(compression());

app.use(cors());
app.use(express.json());

// Serve static files from the "userImages" directory
app.use("/userImages", express.static(path.join(__dirname, "userImages")));
app.use(
  "/productImages",
  express.static(path.join(__dirname, "productImages"))
);

// Database connection
mongoose
  .connect(process.env.REMOTE_MONGO_URI)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
  });

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/payment", paymentRoutes);

// Global Error Handling Middleware
app.use(errorMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

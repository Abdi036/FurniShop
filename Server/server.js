const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const xss = require("xss-clean");
const mongosanitize = require("express-mongo-sanitize");

// files
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const errorMiddleware = require("./controllers/errorController");

dotenv.config();

// const PORT = process.env.PORT || 8000;

const app = express();

// Middlewares
// NOSQL quiery injection protection
app.use(mongosanitize());
app.use(xss());

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
app.listen(5000, "0.0.0.0", () => {
  console.log(`Server is running on port 5000`);
});

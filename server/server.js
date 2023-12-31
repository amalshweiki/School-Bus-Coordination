import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Security middleware
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";

import connectDB from "./config/db.js";

import errorHandler from "./middleware/errorHandler.js";

import schools from "./routes/schoolRoutes.js";
import buses from "./routes/busRoutes.js";
import auth from "../server/routes/authRoutes.js";

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

// // // Dev logging middleware
// if (process.env.NODE_ENV !== "production") {
//   app.use(morgan("dev"));
// }

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS (Cross-Site Scripting) attacks
/*
  It is a type of web security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.
*/
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Enable CORS (Cross-Origin Resource Sharing)
/*
  CORS is a web security mechanism that allows web applications to access resources hosted on other domains while protecting against unauthorized access and web-based attacks.
*/
app.use(cors());

// Set security HTTP headers
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to School Bus Coordination ",
  });
});

app.use("/api/v1/schools", schools); // http://localhost:5000/api/v1/schools
app.use("/api/v1/buses", buses); // http://localhost:5000/api/v1/buses
app.use("/api/v1/auth", auth); // http://localhost:5000/api/v1/auth

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

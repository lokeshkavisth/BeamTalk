import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import pool from "./configs/db.js";
import errorHandler from "./middlewarers/errorHandler.js";
import { responseHandler } from "./middlewarers/responseHandler.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
app.use(
  rateLimit({
    limit: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again after an hour",
  })
);
app.use(responseHandler);

// routes
app.get("/", async (req, res) => {
  try {
    // SELECT datname FROM pg_database
    const result = await pool.query("SELECT current_database()"); // Example query
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error executing query", err.stack);
    res.status(500).json({ error: "Database query error" });
  }
});

app.use("/api/v1/user", userRoutes);

// error handler
app.use(errorHandler);

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

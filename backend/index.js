import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {
  BASE_PATH_PREFIX,
  CORS_ORIGIN,
  DB_API_URL,
  PORT,
} from "./config/apiConfig.js";
import { transactionsRouter } from "./controllers/transactions.js";

dotenv.config();

mongoose
  .connect(process.env.DB_API_URL || DB_API_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || CORS_ORIGIN }));
app.use(express.json());
app.use(process.env.BASE_PATH_PREFIX || BASE_PATH_PREFIX, transactionsRouter);
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT || PORT}`);
});

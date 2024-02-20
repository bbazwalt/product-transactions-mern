require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const transactionsRouter = require("./controllers/transactions");
const {  PORT, DB_API_URL,   CORS_ORIGIN, BASE_PATH_PREFIX } = require("./config/apiConfig");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || CORS_ORIGIN }));

mongoose
  .connect(process.env.DB_API_URL || DB_API_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use(process.env.BASE_PATH_PREFIX || BASE_PATH_PREFIX, transactionsRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${process.env.PORT || PORT}`);
});

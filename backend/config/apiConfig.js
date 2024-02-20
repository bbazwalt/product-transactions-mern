const DB_API_URL = "mongodb://127.0.0.1:27017/transaction";
const PORT = 5000;
const PRODUCT_TRANSACTION_API_URL =
  "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
const CORS_ORIGIN = "http://localhost:3000";
const BASE_PATH_PREFIX = "/api/v1";

module.exports = {
  DB_API_URL,
  PORT,
  PRODUCT_TRANSACTION_API_URL,
  CORS_ORIGIN,
  BASE_PATH_PREFIX,
};

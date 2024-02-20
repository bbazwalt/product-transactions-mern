const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const axios = require("axios");
const { PRODUCT_TRANSACTION_API_URL } = require("../config/apiConfig");
const getAllTransactionsData = require("../services/getAllTransactionsData");
const getBarChartData = require("../services/getBarChartData");
const getPieChartData = require("../services/getPieChartData");
const getStatisticsData = require("../services/getStatisticsData");
const { isValidMonth } = require("../config/serviceConfig");

router.get("/init", async (req, res) => {
  const response = await axios.get(
    process.env.PRODUCT_TRANSACTION_API_URL || PRODUCT_TRANSACTION_API_URL
  );
  try {
    await Transaction.insertMany(response.data);

    res.send("Database initialized.");
  } catch (error) {
    res.status(500).json({
      message:
        "Error occured while intializing transactions into the database.",
      error: error.message,
    });
  }
});

router.get("/transactions", async (req, res) => {
  const { month, search, page, perPage } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required." });
  }
  if (!isValidMonth(month)) {
    return res.status(400).json({ message: "Invalid month." });
  }
  if (page < 1) {
    return res.status(400).json({ message: "Invalid page number." });
  }
  if (perPage < 1) {
    return res.status(400).json({ message: "Invalid perPage number." });
  }
  try {
    const results = await getAllTransactionsData({
      month,
      search,
      page,
      perPage,
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error occured while fetching transactions.",
      error: error.message,
    });
  }
});

router.get("/statistics", async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required." });
  }

  if (!isValidMonth(month)) {
    return res.status(400).json({ message: "Invalid month." });
  }

  try {
    const results = await getStatisticsData({ month });
    res.json(results);
  } catch (error) {
    res.status(500).json({
      message: "Error occured while fetching statistics data.",
      error: error.message,
    });
  }
});

router.get("/barchart", async (req, res) => {
  const { month } = req.query;
  if (!month) {
    return res.status(400).json({ message: "Month is required." });
  }

  if (!isValidMonth(month)) {
    return res.status(400).json({ message: "Invalid month." });
  }

  try {
    const results = await getBarChartData({ month });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching barchart data.", error: error.message });
  }
});

router.get("/piechart", async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ message: "Month is required." });
  }

  if (!isValidMonth(month)) {
    return res.status(400).json({ message: "Invalid month." });
  }

  try {
    const results = await getPieChartData({ month });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching piechart data.", error: error.message });
  }
});

router.get("/combined", async (req, res) => {
  try {
    const { month, search, page, perPage } = req.query;
    if (!month) {
      return res.status(400).json({ message: "Month is required." });
    }
    if (!isValidMonth(month)) {
      return res.status(400).json({ message: "Invalid month." });
    }
    if (page < 1) {
      return res.status(400).json({ message: "Invalid page number." });
    }
    if (perPage < 1) {
      return res.status(400).json({ message: "Invalid perPage number." });
    }
    const transactionsData = await getAllTransactionsData({
      month,
      search,
      page,
      perPage,
    });
    const statisticsData = await getStatisticsData({ month });
    const barChartData = await getBarChartData({ month });
    const pieChartData = await getPieChartData({ month });

    res.json({
      transactions: transactionsData,
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching combined data.", error: error.message });
  }
});

module.exports = router;

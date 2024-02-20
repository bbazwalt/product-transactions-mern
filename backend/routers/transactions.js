const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const axios = require("axios");
const { PRODUCT_TRANSACTION_API_URL } = require("../config/apiConfig");
const listTransactions = require("../services/getAllTransactionsData");

router.get("/init", async (req, res) => {
  const response = await axios.get(PRODUCT_TRANSACTION_API_URL);
  await Transaction.insertMany(response.data);
  res.send("Database initialized");
});

router.get("/transactions", async (req, res) => {
  const { page = 1, perPage = 10, search = "", month } = req.query;

  try {
    const results = await listTransactions({ month, search, page, perPage });
    res.json(results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: error.message });
  }
});

router.get("/statistics", async (req, res) => {
  const { month } = req.query;
  const monthRegex = new RegExp(`^${month}`, "i");

  try {
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: monthRegex }, sold: true } },
      { $group: { _id: null, total: { $sum: "$product.price" } } },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: monthRegex },
      sold: true,
    });
    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: { $regex: monthRegex },
      sold: false,
    });

    res.json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/barchart", async (req, res) => {
  const { month } = req.query;
  const monthRegex = new RegExp(`^${month}`, "i");

  try {
    const priceRanges = [{ $lt: 100 }, { $gte: 100, $lt: 200 }, { $gte: 900 }];

    const rangeCounts = await Promise.all(
      priceRanges.map(async (range, index) => {
        const count = await Transaction.countDocuments({
          "product.price": range,
          dateOfSale: { $regex: monthRegex },
        });
        return { [`range${index + 1}`]: count };
      })
    );

    res.json(rangeCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/piechart", async (req, res) => {
  const { month } = req.query;
  const monthRegex = new RegExp(`^${month}`, "i");

  try {
    const categoryCounts = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: monthRegex } } },
      { $group: { _id: "$product.category", count: { $sum: 1 } } },
    ]);

    res.json(
      categoryCounts.map((category) => ({
        category: category._id,
        items: category.count,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/combined", async (req, res) => {
  try {
    const { month, search, page, perPage } = req.query;
    const queryParams = { month, search, page, perPage };

    const [transactionsData, statisticsData, barChartData, pieChartData] =
      await Promise.all([
        listTransactions(queryParams),
        getStatistics(queryParams),
        getBarChartData(queryParams),
        getPieChartData(queryParams),
      ]);

    res.json({
      transactions: transactionsData,
      statistics: statisticsData,
      barChart: barChartData,
      pieChart: pieChartData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching combined data", error: error.message });
  }
});

module.exports = router;

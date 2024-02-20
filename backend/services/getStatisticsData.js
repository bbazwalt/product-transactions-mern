const Transaction = require("../models/Transaction");
const { getMonthNumber } = require("../config/serviceConfig");

const getStatisticsData = async ({ month }) => {
  const query = [];

  if (month) {
    query.push({
      $addFields: {
        monthOfSale: { $month: "$dateOfSale" },
      },
    });
    const monthNumber = getMonthNumber(month);
    query.push({
      $match: {
        monthOfSale: parseInt(monthNumber),
      },
    });
  }

  const pipeline = [
    ...query,
    {
      $group: {
        _id: "$sold",
        totalSaleAmount: { $sum: "$price" },
        count: { $sum: 1 },
      },
    },
  ];

  const stats = await Transaction.aggregate(pipeline);

  const response = {
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  };

  stats.forEach((stat) => {
    if (stat._id) {
      response.totalSaleAmount += stat.totalSaleAmount;
      response.totalSoldItems += stat.count;
    } else {
      response.totalNotSoldItems += stat.count;
    }
  });

  response.totalSaleAmount = Math.floor(response.totalSaleAmount * 100) / 100;

  return response || {};
};

module.exports = getStatisticsData;

const Transaction = require("../models/Transaction");
const { getMonthNumber } = require("../config/serviceConfig");

const getPieChartData = async ({ month }) => {
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

  query.push({
    $group: {
      _id: "$category",
      count: { $sum: 1 },
    },
  });

  const result = (await Transaction.aggregate(query).exec()) || [];
  const pieChartData = result.map((item) => ({
    category: item._id,
    items: item.count,
  }));

  return pieChartData || [];
};

module.exports = getPieChartData;

import { getMonthNumber } from "../config/serviceConfig.js";
import Transaction from "../models/Transaction.js";

export const getPieChartData = async ({ month }) => {
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

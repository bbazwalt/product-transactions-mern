const { getMonthNumber, priceRanges } = require("../config/serviceConfig");
const Transaction = require("../models/Transaction");

const getBarChartData = async ({ month }) => {
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
    $bucket: {
      groupBy: "$price",
      boundaries: priceRanges.boundaries,
      default: priceRanges.default,
      output: {
        count: { $sum: 1 },
      },
    },
  });

  query.push({
    $project: {
      _id: 0,
      range: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", 0] }, then: "0-100" },
            { case: { $eq: ["$_id", 101] }, then: "101-200" },
            { case: { $eq: ["$_id", 201] }, then: "201-300" },
            { case: { $eq: ["$_id", 301] }, then: "301-400" },
            { case: { $eq: ["$_id", 401] }, then: "401-500" },
            { case: { $eq: ["$_id", 501] }, then: "501-600" },
            { case: { $eq: ["$_id", 601] }, then: "601-700" },
            { case: { $eq: ["$_id", 701] }, then: "701-800" },
            { case: { $eq: ["$_id", 801] }, then: "801-900" },
            { case: { $eq: ["$_id", "901-Above"] }, then: "901-Above" },
          ],
          default: "Other",
        },
      },
      count: "$count",
    },
  });

  const barChartData = await Transaction.aggregate(query);

  const allRangesWithZeroCount = priceRanges.boundaries
    .slice(0, -1)
    .reduce((acc, boundary, index, boundaries) => {
      const nextBoundary = boundaries[index + 1] || priceRanges.default;
      const rangeKey =
        nextBoundary === priceRanges.default
          ? nextBoundary
          : `${boundary}-${nextBoundary - 1}`;
      acc[rangeKey] = { range: rangeKey, count: 0 };
      return acc;
    }, {});

  barChartData.forEach((data) => {
    const rangeKey = data.range;
    if (allRangesWithZeroCount[rangeKey]) {
      allRangesWithZeroCount[rangeKey].count = data.count;
    }
  });

  const finalBarChartData = Object.values(allRangesWithZeroCount);

  return finalBarChartData || [];
};

module.exports = getBarChartData;

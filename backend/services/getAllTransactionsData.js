const Transaction = require("../models/Transaction");
const { getMonthNumber } = require("../config/serviceConfig");

const getAllTransactionsData = async ({
  month,
  search = "",
  page = 1,
  perPage = 10,
}) => {
  const query = [];

  query.push({ $sort: { id: 1 } });

  if (search) {
    const searchRegex = new RegExp(search, "i");
    query.push({
      $addFields: {
        priceAsString: { $toString: "$price" },
      },
    });
    query.push({
      $match: {
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { priceAsString: searchRegex },
        ],
      },
    });
  }
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
  const totalCount = await Transaction.aggregate([
    ...query,
    { $count: "total" },
  ]).exec();
  const totalItems = totalCount[0] ? totalCount[0].total : 0;
  const totalPages = Math.ceil(totalItems / perPage) || 1;

  query.push(
    { $skip: (parseInt(page) - 1) * parseInt(perPage) },
    { $limit: parseInt(perPage) }
  );

  const transactions = (await Transaction.aggregate(query).exec()) || [];

  return {
    transactions,
    totalPages,
  };
};

module.exports = getAllTransactionsData;

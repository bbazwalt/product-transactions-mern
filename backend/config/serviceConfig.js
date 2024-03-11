export const getMonthNumber = (monthName) => {
  const months = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  return months[monthName];
};

export const isValidMonth = (monthName) => {
  return getMonthNumber(monthName) !== undefined;
};

export const priceRanges = {
  boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901],
  default: "901-Above",
};

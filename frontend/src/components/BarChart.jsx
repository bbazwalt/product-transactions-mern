/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { barChartOptions } from "../config/config";
import { getBarChartData } from "../redux/transaction/action";

const BarChart = ({ isGlobal, globalMonth }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.transaction.isLoading);
  let barChartData = null;

  if (isGlobal) {
    barChartData = useSelector(
      (state) => state.transaction?.combinedData?.barChart
    );
  } else {
    barChartData = useSelector((state) => state.transaction.barChartData);
  }

  const [month, setMonth] = useState("March");
  const [showAllRanges, setShowAllRanges] = useState(true);

  const filteredChartData = showAllRanges
    ? barChartData
    : barChartData?.filter((data) => data.count > 0);

  const data = {
    labels: filteredChartData?.map((data) => data.range),
    datasets: [
      {
        label: "Number of Items",
        font: {
          size: 16,
          weight: "bold",
        },
        data: filteredChartData?.map((data) => data.count),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleCheckboxChange = () => {
    setShowAllRanges(!showAllRanges);
  };

  useEffect(() => {
    if (!isGlobal) {
      dispatch(getBarChartData({ month }));
    }
  }, [dispatch, month]);

  return (
    <div className="mb-4">
      <div className=" flex flex-row items-center justify-center">
        <h1 className="text-xl font-bold">
          Bar Chart Stats - {isGlobal && globalMonth}
        </h1>
        {!isGlobal && (
          <select
            value={month}
            onChange={handleMonthChange}
            className="border-2 border-gray-300 rounded-md p-2 ml-2"
          >
            <option value="" disabled>
              Select month
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option
                key={i}
                value={new Date(0, i).toLocaleString("default", {
                  month: "long",
                })}
              >
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        )}
        <label className="text-md font-semibold flex items-center justify-center">
          <input
            className="ml-3 mr-1 w-5 h-5"
            type="checkbox"
            checked={showAllRanges}
            onChange={handleCheckboxChange}
          />
          Show all ranges
        </label>
      </div>

      {isLoading ? (
        <div className="text-center mt-2 font-semibold text-xl">
          Please wait. Loading...
        </div>
      ) : (
        <Bar data={data} options={barChartOptions} />
      )}
    </div>
  );
};

export default BarChart;

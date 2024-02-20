/* eslint-disable react-hooks/rules-of-hooks */
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getPieChartOptions } from "../config/config";
import { getPieChartData } from "../redux/transaction/action";

const PieChart = ({ isGlobal, globalMonth }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.transaction.isLoading);

  let pieChartData = null;
  if (isGlobal) {
    pieChartData = useSelector(
      (store) => store.transaction?.combinedData?.pieChart
    );
  } else {
    pieChartData = useSelector((store) => store.transaction.pieChartData);
  }

  const [month, setMonth] = useState("March");
  const [activeIndex, setActiveIndex] = useState(null);

  const data = {
    labels: pieChartData?.map((item) => item.category),
    datasets: [
      {
        backgroundColor: pieChartData?.map(
          () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 85%)`
        ),
        hoverBackgroundColor: "black",
        data: pieChartData?.map((item) => item.items),
      },
    ],
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    if (!isGlobal) {
      dispatch(getPieChartData({ month }));
    }
  }, [dispatch, month]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-xl font-bold">
          Pie Chart Stats - {isGlobal && globalMonth}
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
      </div>
      {isLoading ? (
        <div className="text-center font-semibold text-xl">
          Please wait. Loading...
        </div>
      ) : (
        <div className="w-1/2 h-auto mt-5">
          <Pie
            data={data}
            options={getPieChartOptions(activeIndex, setActiveIndex)}
            plugins={[ChartDataLabels]}
          />
        </div>
      )}
    </div>
  );
};

export default PieChart;

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatisticsData } from "../redux/transaction/action";

const Statistics = ({ isGlobal, globalMonth }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.transaction.isLoading);

  let stats = null;

  if (isGlobal) {
    stats = useSelector((state) => state.transaction?.combinedData?.statistics);
  } else {
    stats = useSelector((state) => state.transaction.stats);
  }

  const [month, setMonth] = useState("March");

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    if (!isGlobal) {
      dispatch(getStatisticsData({ month }));
    }
  }, [dispatch, month]);

  return (
    <div className="flex justify-center items-center  h-full">
      <div className="bg-white shadow-2xl my-36 rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex flex-row items-center justify-center">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Statistics - {isGlobal && globalMonth}
          </h2>

          {!isGlobal && (
            <select
              value={month}
              onChange={handleMonthChange}
              className="border-2 border-gray-300 rounded-md p-2 mb-5 ml-2 text-xl"
            >
              <option className="font-semibold" value="" disabled>
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
          <div className="text-center mt-2 font-semibold text-xl">
            Please wait. Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-lg border border-gray-300">
              <tbody>
                <tr className="border-2 border-gray-300">
                  <td className="text-left font-semibold p-4 border-2 border-gray-300 bg-gray-200">
                    Total Sale Amount:
                  </td>
                  <td className="text-right p-4">{stats?.totalSaleAmount}</td>
                </tr>
                <tr className="border-2 border-gray-300">
                  <td className="text-left font-semibold p-4 border-2 border-gray-300 bg-gray-200">
                    Total Number of Sold Items:
                  </td>
                  <td className="text-right p-4">{stats?.totalSoldItems}</td>
                </tr>
                <tr className="border-2 border-gray-300">
                  <td className="text-left font-semibold p-4 border-2 border-gray-300 bg-gray-200">
                    Total Number of Not Sold Items:
                  </td>
                  <td className="text-right p-4">{stats?.totalNotSoldItems}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;

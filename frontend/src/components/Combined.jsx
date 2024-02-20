import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCombinedData } from "../redux/transaction/action";
import BarChart from "./BarChart";
import Dashboard from "./Dashboard";
import PieChart from "./PieChart";
import Statistics from "./Statistics";

const Combined = () => {
  const dispatch = useDispatch();

  const [globalMonth, setGlobalMonth] = useState("March");
  const [globalCurrentPage, setGlobalCurrentPage] = useState(1);
  const [globalItemsPerPage, setGlobalItemsPerPage] = useState(10);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  useEffect(() => {
    dispatch(
      getCombinedData({
        month: globalMonth,
        searchQuery: globalSearchQuery,
        currentPage: globalCurrentPage,
        itemsPerPage: globalItemsPerPage,
      })
    );
  }, [
    dispatch,
    globalCurrentPage,
    globalItemsPerPage,
    globalMonth,
    globalSearchQuery,
  ]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-4">Dashboard</h2>
      <Dashboard
        isGlobal={true}
        setGlobalMonth={setGlobalMonth}
        setGlobalSearchQuery={setGlobalSearchQuery}
        setGlobalCurrentPage={setGlobalCurrentPage}
        setGlobalItemsPerPage={setGlobalItemsPerPage}
      />
      <hr className="my-4 border-t border-gray-300" />

      <h2 className="text-3xl font-bold text-center my-4">Statistics</h2>
      <Statistics isGlobal={true} globalMonth={globalMonth} />
      <hr className="my-4 border-t border-gray-300" />

      <h2 className="text-3xl font-bold text-center my-4">Bar Chart</h2>
      <BarChart isGlobal={true} globalMonth={globalMonth} />
      <hr className="my-4 border-t border-gray-300" />

      <h2 className="text-3xl font-bold text-center my-4">Pie Chart</h2>
      <PieChart isGlobal={true} globalMonth={globalMonth} />
    </div>
  );
};

export default Combined;

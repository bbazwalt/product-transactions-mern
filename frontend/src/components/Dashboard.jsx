/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactionsData } from "../redux/transaction/action";

const Dashboard = ({
  isGlobal,
  setGlobalMonth,
  setGlobalSearchQuery,
  setGlobalCurrentPage,
  setGlobalItemsPerPage,
}) => {
  const dispatch = useDispatch();
  let transactions = [];
  let totalPages = 1;

  const isLoading = useSelector((state) => state.transaction.isLoading);

  if (isGlobal) {
    transactions = useSelector(
      (state) => state.transaction?.combinedData?.transactions?.transactions
    );
    totalPages = useSelector(
      (state) => state.transaction?.combinedData?.transactions?.totalPages
    );
  } else {
    transactions = useSelector(
      (state) => state.transaction.dashboardData.transactions
    );
    totalPages = useSelector(
      (state) => state.transaction.dashboardData.totalPages
    );
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [month, setMonth] = useState("March");

  useEffect(() => {
    if (!isGlobal) {
      dispatch(
        getAllTransactionsData({
          month,
          searchQuery,
          currentPage,
          itemsPerPage,
        })
      );
    }
  }, [month, searchQuery, currentPage, itemsPerPage, dispatch]);

  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  const itemsPerPageOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    if (isGlobal) {
      setGlobalMonth(event.target.value);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (isGlobal) {
      setGlobalSearchQuery(event.target.value);
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    const textString = text.toString();

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = textString.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span key={index} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search transactions"
          className="border-2 border-gray-300 mr-2 w-full rounded-md p-2"
        />
        <select
          value={month}
          onChange={handleMonthChange}
          className="border-2 border-gray-300 ml-2 rounded-md p-2"
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
      </div>
      {isLoading ? (
        <div className="text-center mt-2 font-semibold text-xl">
          Please wait. Loading...
        </div>
      ) : transactions?.length !== 0 ? (
        <table className="min-w-full rounded-md  border-2 shadow">
          <thead className="bg-gray-200 ">
            <tr className="border-2">
              <th className="border-2 border-gray-300 w-1/12">ID</th>
              <th className="border-2 border-gray-300 w-2/12">Title</th>
              <th className="border-2 border-gray-300 w-5/12">Description</th>
              <th className="border-2 border-gray-300 w-1/12">Price</th>
              <th className="border-2 border-gray-300 w-1/12">Category</th>
              <th className="border-2 border-gray-300 w-1/12">Sold</th>
              <th className="border-2 border-gray-300 w-1/12">Image</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50  text-center ">
            {transactions?.map((transaction) => (
              <tr key={transaction.id} className="border-2">
                <td className="border-2 border-gray-300 p-2">
                  {transaction.id}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {highlightSearchTerm(transaction.title, searchQuery)}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {highlightSearchTerm(transaction.description, searchQuery)}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {highlightSearchTerm(transaction.price, searchQuery)}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {transaction.category}
                </td>
                <td className="border-2 border-gray-300 p-2">
                  {transaction.sold ? "Yes" : "No"}
                </td>
                <td className="border-2 border-gray-300 p-2 whitespace-nowrap">
                  <img
                    src={transaction.image}
                    alt="Transaction"
                    className="h-20 w-20 rounded-md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-base">No transactions found</div>
      )}

      <div className="flex items-center justify-between py-3">
        <div>
          <span className="font-semibold"> Page:</span>
          <span className="font-medium ml-1 mr-2">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="border-2 border-gray-300 rounded-md p-2"
            >
              {pageOptions.map((page) => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>
          </span>
          of <span className="font-medium px-1">{totalPages}</span>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-4 py-2 mx-1 font-semibold bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <button
            onClick={() => {
              setCurrentPage(currentPage + 1);
              if (isGlobal) {
                setGlobalCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 mx-1 font-semibold bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div>
          <span className="font-semibold"> Items per page:</span>

          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              if (isGlobal) {
                setGlobalItemsPerPage(Number(e.target.value));
              }
            }}
            className="border-2 ml-1 border-gray-300 rounded-md p-2"
          >
            {itemsPerPageOptions.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

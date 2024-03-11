import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { initiateDatabase } from "../redux/transaction/action";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Statistics", path: "/statistics" },
  { name: "Bar Chart", path: "/barchart" },
  { name: "Pie Chart", path: "/piechart" },
  { name: "Combined", path: "/combined" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.transaction.message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_MESSAGE" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  const handleInitiateDatabase = () => {
    dispatch(initiateDatabase());
  };

  return (
    <nav className="bg-gray-400 max-w-[76rem] mx-auto mb-4 px-2 rounded-md text-white">
      <ul className="flex space-x-4 text-center  justify-between flex-row">
        <div className="font-bold text-black p-3">Product Transactions</div>
        <div className="flex flex-row font-semibold items-center justify-center">
          <li className="text-green-900 mr-2 ">{message && message}</li>
          <li
            className="text-green-900 mr-2 p-3 cursor-pointer bg-gray-300 rounded-md"
            onClick={handleInitiateDatabase}
          >
            Initiate Database
          </li>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black rounded-md bg-zinc-50 p-3"
                    : "text-white m-1 hover:text-black rounded-md p-3"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;

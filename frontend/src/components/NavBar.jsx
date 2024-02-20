import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Statistics", path: "/statistics" },
    { name: "Bar Chart", path: "/barchart" },
    { name: "Pie Chart", path: "/piechart" },
    { name: "Combined", path: "/combined" },
  ];

  return (
    <nav className="bg-gray-400 max-w-[76rem] mx-auto p-4 mb-4 rounded-md text-white">
      <ul className="flex space-x-4 text-center  justify-between flex-row">
        <div className="font-bold text-black">Product Transactions</div>
        <div className="flex flex-row font-semibold items-center justify-center">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-black rounded-md bg-zinc-50 m-1 p-3"
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

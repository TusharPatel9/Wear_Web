import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdShoppingBag,
  MdPerson,
  MdPayment,
  MdLocationOn,
  MdLogout,
} from "react-icons/md";

function CustomerProfileSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Profile", path: "", icon: <MdPerson /> }, // ✅ FIX
    { name: "Orders", path: "orders", icon: <MdShoppingBag /> },
    { name: "Addresses", path: "addresses", icon: <MdLocationOn /> },
  ];

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-300 flex flex-col">
      {/* Menu */}
      <div className="mt-6 flex flex-col gap-2 px-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 text-md rounded-md capitalize
              ${
                isActive
                  ? "bg-[#008060] text-white"
                  : "text-gray-700  hover:bg-gray-100"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Logout just below menu */}
      <div className="px-4 mt-4">
        <button
          onClick={logoutHandler}
          className="flex items-center gap-4 px-4 py-3 text-red-500 font-semibold"
        >
          <MdLogout className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default CustomerProfileSidebar;

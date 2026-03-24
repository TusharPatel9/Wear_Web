import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const [userData, setUserData] = useState();

  const [orders, setOrders] = useState([
    {
      id: 1,
      name: 'Boult Mirage 1.39" Screen, BT Calling, Working Crown, Zinc Alloy Frame, 500 Nits, SpO2 Smartwatch (Amber Blue Strap, Free Size)',
      size: "FREE",
      status: "PENDING",
      deliveryDate: "Fri, Jul 25",
      image: "https://via.placeholder.com/70",
    },
  ]);

  const menu = [
    { id: "orders", label: "orders" },
    { id: "profile", label: "profile" },
    { id: "cards", label: "Saved Cards" },
    { id: "address", label: "Addresses" },

  ];

  const getCustomerDetail = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      setUserData(res.data.data.userObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  function logOutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href="/"
  }

  return (
    <div className="min-h-screen bg-[#f1f3f6] px-6 py-4">
      <div className="max-w-6xl mx-auto">
        {/*  HEADER (fixed) */}
        <div className="pb-4 border-b border-gray-400">
          <h2 className="text-xl font-semibold">{userData?.name}</h2>
        </div>

        {/* MAIN */}
        <div className="flex mt-6">
          {/* SIDEBAR (fixed style) */}
          <div className="w-64  pr-6 border-r border-gray-300">
            <ul className="space-y-2">
              {menu.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 text-sm capitalize rounded-md
                      ${
                        activeTab === item.id
                          ? "bg-[#008060] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 pl-6">
            {/* PROFILE */}
            {activeTab === "profile" && (
              <div>
                <h3 className="text-base font-semibold mb-4">
                  Profile Details
                </h3>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Name:</span> {userData?.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {userData?.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span>{" "}
                    {userData?.phone}
                  </p>
                </div>
              </div>
            )}

            {/*  ORDERS (fixed layout exactly like image) */}
            {activeTab === "orders" && (
              <div>
                <h3 className="text-base font-semibold">All orders</h3>
                <p className="text-sm text-gray-500 mb-4">from anytime</p>

                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-md p-4 bg-white"
                  >
                    {/* STATUS */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#008060] text-white">
                        ⚡
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#008060]">
                          {order.status}
                        </p>
                        <p className="text-xs text-gray-500">
                          Arriving by {order.deliveryDate}
                        </p>
                      </div>
                    </div>

                    {/* PRODUCT STRIP */}
                    <div className="flex items-center gap-4 bg-[#e6f4f1] p-3 rounded-md">
                      <img
                        src={order.image}
                        alt=""
                        className="w-16 h-16 object-cover"
                      />

                      <div className="text-sm">
                        <p className="font-medium leading-5">{order.name}</p>
                        <p className="text-gray-600 mt-1">
                          size : {order.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CARDS */}
            {activeTab === "cards" && (
              <div>
                <h3 className="text-base font-semibold">Saved Cards</h3>
                <p className="text-sm text-gray-500">No cards saved</p>
              </div>
            )}

            {/* ADDRESS */}
            {activeTab === "address" && (
              <div>
                <h3 className="text-base font-semibold">Addresses</h3>
                <p className="text-sm text-gray-500">No address added</p>
              </div>
            )}

           
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => {
                    logOutHandler();
                  }}
                >
                  Log Out
                </button>
        
          </div>
        </div>
      </div>
    </div>
  );
}

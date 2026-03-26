import React from "react";
import { useNavigate } from "react-router-dom";

const orders = [
  {
    _id: "ORD123",
    date: "2026-03-20",
    total: 2499,
    status: "Delivered",
    image: "https://via.placeholder.com/80",
  },
  {
    _id: "ORD124",
    date: "2026-03-22",
    total: 1499,
    status: "Shipped",
    image: "https://via.placeholder.com/80",
  },
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-md transition"
          >
            {/* Left */}
            <div className="flex gap-4 items-center">
              <img
                src={order.image}
                alt="product"
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div>
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
                <p className="text-sm">₹{order.total}</p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p
                className={`font-semibold ${
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                {order.status}
              </p>

              <button
                onClick={() => navigate(`/profile/order/${order._id}`)}
                className="mt-2 px-4 py-1 bg-black text-white rounded-lg text-sm hover:bg-gray-800"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
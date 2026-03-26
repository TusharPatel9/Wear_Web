import React from "react";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();

  const order = {
    _id: id,
    status: "Shipped",
    date: "2026-03-22",
    total: 1499,
    products: [
      {
        name: "Stylish Shirt",
        price: 999,
        qty: 1,
        image: "https://via.placeholder.com/100",
      },
      {
        name: "Jeans",
        price: 500,
        qty: 1,
        image: "https://via.placeholder.com/100",
      },
    ],
  };

  const timeline = [
    { title: "Order Placed", date: "20 Mar 2026", done: true },
    { title: "Packed", date: "21 Mar 2026", done: true },
    { title: "Shipped", date: "22 Mar 2026", done: true },
    { title: "Out for Delivery", date: "", done: false },
    { title: "Delivered", date: "", done: false },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Order Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Date:</strong> {order.date}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.total}
        </p>
        <p className="text-blue-600 font-semibold">{order.status}</p>
      </div>

      {/* Products */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-3">Products</h3>

        {order.products.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            <img
              src={item.image}
              className="w-20 h-20 rounded-lg object-cover"
              alt=""
            />
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.qty}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Timeline */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Order Timeline</h3>

        <div className="relative border-l-2 border-gray-300 ml-4">
          {timeline.map((step, index) => (
            <div key={index} className="mb-6 ml-4">
              {/* Dot */}
              <div
                className={`absolute -left-2 w-4 h-4 rounded-full ${
                  step.done ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>

              {/* Content */}
              <p className="font-medium">{step.title}</p>
              <p className="text-sm text-gray-500">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

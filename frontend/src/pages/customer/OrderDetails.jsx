import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(`/order/${id}`);
        if (res.data.success) {
          setOrder(res.data.data);
        }
      } catch (error) {
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <p>Order not found.</p>
      </div>
    );
  }

  const timeline = [
    { title: "Placed", date: new Date(order.createdAt).toLocaleDateString(), done: true },
    { title: "Pending", date: "", done: ["Pending", "Shipped", "Delivered"].includes(order.orderStatus) },
    { title: "Shipped", date: "", done: ["Shipped", "Delivered"].includes(order.orderStatus) },
    { title: "Delivered", date: "", done: order.orderStatus === "Delivered" },
  ];

  if (order.orderStatus === "Cancelled") {
    timeline.push({ title: "Cancelled", date: "", done: true })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Order Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Total:</strong> ₹{order.totalAmount}
        </p>
        <p
          className={`font-semibold mt-2 ${order.orderStatus === "Delivered" ? "text-green-600" : "text-blue-600"
            }`}
        >
          {order.orderStatus}
        </p>
      </div>

      {/* Products */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-3">Products</h3>

        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            <img
              src={item.productId?.imagePaths?.[0] || "https://via.placeholder.com/100"}
              className="w-20 h-20 rounded-lg object-cover"
              alt=""
            />
            <div>
              <p>{item.productId?.title || "Unknown Product"}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} × {item.quantity}
              </p>
              <p className="text-xs text-gray-400">
                Color: {item.productId?.colors?.[0] || 'N/A'}, Size: {item.productId?.size?.[0] || 'N/A'}
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
                className={`absolute -left-2 w-4 h-4 rounded-full ${step.done ? (step.title === "Cancelled" ? "bg-red-500" : "bg-green-500") : "bg-gray-300"
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

import React, { useState } from "react";

export default function Order() {
  const orders = [
    {
      _id: "69c37478f62c0e1b4625abfe",
      userId: {
        _id: "user1",
        name: "Raam",
        mobile: "9033447830",
        email: "raam@gmail.com",
      },
      addressId: {
        name: "Raam",
        area: "Gujarat Unity",
        city: "Rajkot",
        state: "Gujarat",
        pincode: "360001",
      },
      sellerId: {
        _id: "seller1",
        name: "Demo Seller",
      },
      items: [
        {
          productId: {
            _id: "prod1",
            title: "Boult Mirage 1.39 Screen Smartwatch",
            price: 2299,
            colors: ["Gold"],
            size: ["FREE"],
            imagePaths: [
              "https://media.istockphoto.com/id/1941897677/photo/broken-or-cracked-watch-or-wristwatches-without-strap-on-a-concrete-surface.jpg?s=2048x2048&w=is&k=20&c=yZbj2AnhPGLR-8IxvqscTvePNFhaBfqkApDr41ViHK0=",
            ],
          },
          quantity: 1,
          price: 2299,
        },
      ],
      totalAmount: 2299,
      orderStatus: "PENDING",
      paymentStatus: "Paid",
      orderDate: "2026-03-19T10:00:00Z",
    },
    {
      _id: "69c37478f62c0e1b4625f23a",
      userId: {
        _id: "user2",
        name: "Raamu Chacha",
        mobile: "9133447810",
        email: "raamu@gmail.com",
      },
      addressId: {
        name: "Raamu Chacha",
        area: "Street 1 2 3",
        city: "Rajkot",
        state: "Gujarat",
        pincode: "360001",
      },
      sellerId: {
        _id: "seller1",
        name: "Demo Seller",
      },
      items: [
        {
          productId: {
            _id: "prod2",
            title: "Embroidered Bollywood Net Saree (Red)",
            price: 1599,
            colors: ["Red"],
            size: ["FREE"],
            imagePaths: [
              "https://images.unsplash.com/photo-1727430228383-aa1fb59db8bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2FyZWV8ZW58MHx8MHx8fDA%3D",
            ],
          },
          quantity: 1,
          price: 1599,
        },
      ],
      totalAmount: 1599,
      orderStatus: "CONFIRMED",
      paymentStatus: "Unpaid",
      orderDate: "2026-03-18T09:30:00Z",
    },
  ];

  const [ordersData, setOrdersData] = useState(orders);
  const [activeSelect, setActiveSelect] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = ordersData.map((order) =>
      order._id === orderId ? { ...order, orderStatus: newStatus } : order,
    );

    setOrdersData(updated);
    setActiveSelect(null);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">All Orders</h2>

      {/* Header */}
      <div className="hidden md:grid grid-cols-[1fr_2fr_1.5fr_1fr_1fr] bg-primary text-white p-3 rounded-md font-semibold">
        <p>Order Id</p>
        <p>Products</p>
        <p>Shipping Address</p>
        <p>Status</p>
        <p>Update</p>
      </div>

      {/* Orders */}
      {ordersData.map((order) => (
        <div key={order._id} className="bg-white mt-3 p-4 rounded-md shadow-sm">
          <div className="grid md:grid-cols-[1fr_2fr_1.5fr_1fr_1fr] gap-6 items-start">
            {/* Order ID */}
            <p className="text-md text-gray-700 break-all">{order._id}</p>

            {/* Products */}
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <img
                    src={item.productId.imagePaths[0]}
                    className="w-20 h-24 object-cover rounded"
                    alt=""
                  />
                  <div className="text-md">
                    <p className="font-medium">{item.productId.title}</p>
                    <p>Price: ₹{item.productId.price}</p>
                    <p>Color: {item.productId.colors[0]}</p>
                    <p>Size: {item.productId.size[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="text-md text-gray-700">
              <p className="font-medium">{order.addressId.name}</p>
              <p>{order.addressId.area}</p>
              <p>{order.addressId.city}</p>
              <p>
                {order.addressId.state} - {order.addressId.pincode}
              </p>
              <p className="mt-1 font-medium">Mobile: {order.userId.mobile}</p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span
                className={`px-4 py-1 text-xs rounded-full border font-medium
                  ${
                    order.orderStatus === "PENDING"
                      ? "text-yellow-600 border-yellow-400 bg-yellow-50"
                      : order.orderStatus === "CONFIRMED"
                        ? "text-green-600 border-green-400 bg-green-50"
                        : order.orderStatus === "SHIPPED"
                          ? "text-blue-600 border-blue-400 bg-blue-50"
                          : order.orderStatus === "DELIVERED"
                            ? "text-purple-600 border-purple-400 bg-purple-50"
                            : "text-gray-600 border-gray-300 bg-gray-50"
                  }
                `}
              >
                {order.orderStatus}
              </span>
            </div>

            {/* Update */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveSelect(activeSelect === order._id ? null : order._id)
                }
                className="text-green-600 font-semibold text-md"
              >
                STATUS
              </button>

              {activeSelect === order._id && (
                <div className="absolute right-0 top-8 w-40 bg-white shadow-lg rounded-md border z-50">
                  {[
                    "PENDING",
                    "PLACED",
                    "CONFIRMED",
                    "SHIPPED",
                    "DELIVERED",
                    "CANCELLED",
                  ].map((statusOption) => (
                    <p
                      key={statusOption}
                      onClick={() =>
                        handleStatusChange(order._id, statusOption)
                      }
                      className="px-4 py-2 text-md hover:bg-gray-100 cursor-pointer"
                    >
                      {statusOption}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

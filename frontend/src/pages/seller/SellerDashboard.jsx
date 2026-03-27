// import React from "react";

// const dashboardData = {
//   stats: [
//     { title: "Revenue", value: "₹1,25,000", icon: "💰" },
//     { title: "Orders", value: "320", icon: "📦" },
//     { title: "Products", value: "58", icon: "🛒" },
//     { title: "Customers", value: "210", icon: "👥" },
//   ],
//   orders: [
//     { id: "ORD001", customer: "Tushar", amount: "₹2500", status: "Delivered" },
//     { id: "ORD002", customer: "Rahul", amount: "₹1500", status: "Pending" },
//     { id: "ORD003", customer: "Amit", amount: "₹3200", status: "Shipped" },
//   ],
//   products: [
//     { name: "Nike Shoes", sales: 120 },
//     { name: "T-Shirt", sales: 80 },
//     { name: "Watch", sales: 60 },
//   ],
// };

// export default function SellerDashboard() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
//       {/* Title */}
//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
//         Seller Dashboard
//       </h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {dashboardData.stats.map((item, index) => (
//           <div
//             key={index}
//             className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-5 rounded-xl shadow hover:scale-105 transition"
//           >
//             <div className="text-3xl">{item.icon}</div>
//             <h3 className="mt-2 text-lg">{item.title}</h3>
//             <p className="text-xl font-bold">{item.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Chart Section */}
//       <div className="bg-white mt-6 p-5 rounded-xl shadow">
//         <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        
//         <div className="flex items-end gap-3 h-40">
//           {[60, 80, 40, 90, 70].map((height, i) => (
//             <div
//               key={i}
//               className="flex-1 bg-blue-500 rounded-md"
//               style={{ height: `${height}%` }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
//         {/* Orders */}
//         <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow overflow-x-auto">
//           <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left border-b">
//                 <th className="py-2">Order ID</th>
//                 <th>Customer</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {dashboardData.orders.map((order, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-2">{order.id}</td>
//                   <td>{order.customer}</td>
//                   <td>{order.amount}</td>
//                   <td>
//                     <span
//                       className={`px-3 py-1 rounded-full text-white text-xs ${
//                         order.status === "Delivered"
//                           ? "bg-green-500"
//                           : order.status === "Pending"
//                           ? "bg-yellow-500"
//                           : "bg-blue-500"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Top Products */}
//         <div className="bg-white p-5 rounded-xl shadow">
//           <h2 className="text-lg font-semibold mb-4">Top Products</h2>

//           {dashboardData.products.map((product, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-3"
//             >
//               <span>{product.name}</span>
//               <span className="text-sm font-semibold">
//                 {product.sales} sales
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }








import React from "react";
import {
  MdInventory,
  MdShoppingCart,
  MdAttachMoney,
  MdPendingActions,
} from "react-icons/md";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SellerDashboard() {

  const stats = [
    {
      title: "Total Products",
      value: 48,
      icon: <MdInventory size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Orders",
      value: 132,
      icon: <MdShoppingCart size={28} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Revenue",
      value: "₹52,400",
      icon: <MdAttachMoney size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: 9,
      icon: <MdPendingActions size={28} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5200 },
    { month: "Apr", sales: 4100 },
    { month: "May", sales: 6200 },
    { month: "Jun", sales: 7200 },
  ];

  return (
    <div className="h-full flex flex-col gap-6">

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Seller Dashboard
      </h2>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h3 className="text-xl font-semibold mt-1">
                {item.value}
              </h3>
            </div>

            <div className={`p-3 rounded-lg ${item.color}`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ================= SALES OVERVIEW ================= */}
      {/* flex-1 makes it take remaining height */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6 min-h-0 flex flex-col">
        <h3 className="text-lg font-semibold mb-4">
          Sales Overview
        </h3>

        {/* Chart fills remaining card height */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#008060"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
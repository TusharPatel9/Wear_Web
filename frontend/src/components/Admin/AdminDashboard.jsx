import React, { useEffect, useState } from "react";
import StatsCard from "../UI/StatsCard";
import axiosInstance from "../../AxiosInstance";
import { MdGroup, MdStorefront, MdShoppingCart, MdAttachMoney } from "react-icons/md";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/admin/dashboard-stats");
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back. Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<MdGroup />}
          colorClass="text-blue-600 bg-blue-50"
        />
        <StatsCard
          title="Total Sellers"
          value={stats.totalSellers}
          icon={<MdStorefront />}
          colorClass="text-purple-600 bg-purple-50"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<MdShoppingCart />}
          colorClass="text-orange-600 bg-orange-50"
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toFixed(2)}`}
          icon={<MdAttachMoney />}
          colorClass="text-green-600 bg-green-50"
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[300px] flex items-center justify-center">
        <p className="text-gray-400">Basic charts will be displayed here.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;

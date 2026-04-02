import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axiosInstance from "../../AxiosInstance";

export default function Profile() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const getCustomerDetail = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/profile");
      setUserData(res.data.data.userObj);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black uppercase">My Profile</h2>
        <p className="text-sm text-gray-500 mt-2">Manage your personal information and preferences.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white text-left p-6 max-w-2xl transition-all border border-gray-100">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full bg-gray-100 text-secondary flex items-center justify-center text-3xl font-bold shadow-inner border border-gray-200">
            {userData?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900 uppercase">
              {userData?.name}
            </h3>
            <p className="text-gray-500 text-sm mt-1">{userData?.email}</p>
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-6">
          {/* Name */}
          <div className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-4 -mx-4 transition-colors">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
              <p className="font-bold text-gray-900">{userData?.name}</p>
            </div>
            <MdEdit className="text-gray-400 group-hover:text-secondary transition-colors" size={20}/>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-4 -mx-4 transition-colors">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
              <p className="font-bold text-gray-900">{userData?.email}</p>
            </div>
            <MdEdit className="text-gray-400 group-hover:text-secondary transition-colors" size={20}/>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center group cursor-pointer hover:bg-gray-50 p-4 -mx-4 transition-colors">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Phone Number</p>
              <p className="font-bold text-gray-900 whitespace-pre-wrap">
                {userData?.phone || "Not provided"}
              </p>
            </div>
            <MdEdit className="text-gray-400 group-hover:text-secondary transition-colors" size={20}/>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-10">
          <button className="w-full bg-primary text-white py-3.5 rounded-sm text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-sm">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

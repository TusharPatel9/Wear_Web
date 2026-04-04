import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [isSaving, setIsSaving] = useState(false);

  const getCustomerDetail = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/profile");
      const uData = res.data.data.userObj;
      setUserData(uData);
      setFormData({
        name: uData.name || "",
        email: uData.email || "",
        mobile: uData.mobile || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  const handleEditToggle = async () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      // Save changes
      try {
        setIsSaving(true);
        const res = await axiosInstance.put("/user/profile", formData);
        if (res.data.success) {
          toast.success("Profile updated perfectly!");
          setUserData(res.data.userObj);
          setIsEditing(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update profile");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white md:p-8">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Details</h2>
      <hr className="border-gray-100 mb-8" />

      {/* Details Table-like Grid */}
      <div className="space-y-6 text-[15px]">
        {/* Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
          <p className="text-gray-500 md:col-span-1">Full Name</p>
          <div className="md:col-span-2">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
                placeholder="Enter full name"
              />
            ) : (
              <p className="text-gray-800">{userData?.name || "—"}</p>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
          <p className="text-gray-500 md:col-span-1">Mobile Number</p>
          <div className="md:col-span-2">
            {isEditing ? (
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
                placeholder="Enter mobile number"
              />
            ) : (
              <p className="text-gray-800">{userData?.mobile || "- not added -"}</p>
            )}
          </div>
        </div>

        {/* Email ID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
          <p className="text-gray-500 md:col-span-1">Email ID</p>
          <div className="md:col-span-2">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-black"
                placeholder="Enter email address"
              />
            ) : (
              <p className="text-gray-800">{userData?.email || "—"}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="mt-12">
        <button
          onClick={handleEditToggle}
          disabled={isSaving}
          className="bg-primary hover:bg-black text-white font-bold tracking-wide uppercase py-3 px-10 rounded-sm transition-colors text-sm w-full md:w-auto md:min-w-[300px] disabled:opacity-50"
        >
          {isSaving ? "SAVING..." : isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>
    </div>
  );
}

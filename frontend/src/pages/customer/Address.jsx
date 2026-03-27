import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import { toast } from "react-toastify";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const getAddresses = async () => {
    try {
      const res = await axiosInstance.get("/address/get-address");
      setAddresses(res.data.data);
    } catch {
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  // 🔥 Submit (Add / Update)
  const onSubmit = async (data) => {
    try {
      if (editId) {
        await axiosInstance.put(`/address/update-address/${editId}`, data);
        toast.success("Address updated");
      } else {
        await axiosInstance.post("/address/add-address", data);
        toast.success("Address added");
      }

      reset();
      setEditId(null);
      setShowForm(false);
      getAddresses();
    } catch {
      toast.error("Something went wrong");
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/address/delete-address?addressId=${id}`);
      toast.success("Deleted");
      getAddresses();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 Edit
  const handleEdit = (addr) => {
    setValue("area", addr.area);
    setValue("city", addr.city);
    setValue("state", addr.state);
    setValue("pincode", addr.pincode);
    setValue("mobile", addr.mobile);

    setEditId(addr._id);
    setShowForm(true);
    setActiveMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>

        {/* Add Button */}
        <div
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            reset();
          }}
          className="bg-white shadow hover:shadow-md transition rounded-xl p-4 cursor-pointer flex items-center gap-2 text-gray-600 font-medium"
        >
          <FaPlus /> ADD A NEW ADDRESS
        </div>

        {/* Form */}
        {showForm && (
          <form
            className="bg-gray-50 border mt-4 p-6 rounded-xl"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid md:grid-cols-2 gap-4">

              {/* Mobile */}
              <input
                placeholder="Mobile"
                {...register("mobile", { required: true })}
                className="shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.mobile && <p className="text-red-500 text-sm">Required</p>}

              {/* Pincode */}
              <input
                placeholder="Pincode"
                {...register("pincode", { required: true })}
                className="shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.pincode && <p className="text-red-500 text-sm">Required</p>}

              {/* City */}
              <input
                placeholder="City"
                {...register("city", { required: true })}
                className="shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.city && <p className="text-red-500 text-sm">Required</p>}

              {/* State */}
              <input
                placeholder="State"
                {...register("state", { required: true })}
                className="shadow rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.state && <p className="text-red-500 text-sm">Required</p>}

              {/* Area */}
              <textarea
                placeholder="Area / Street"
                {...register("area", { required: true })}
                className="shadow rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              {errors.area && <p className="text-red-500 text-sm">Required</p>}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
                {editId ? "UPDATE" : "SAVE"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-blue-600 font-medium"
              >
                CANCEL
              </button>
            </div>
          </form>
        )}

        {/* Address List */}
        <div className="mt-6 space-y-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white shadow rounded-xl hover:shadow-md transition p-4 relative"
            >
              <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                HOME
              </span>

              <div className="mt-2 font-medium">{addr.mobile}</div>

              <div className="text-gray-700 mt-1">
                {addr.area}, {addr.city}, {addr.state} - {addr.pincode}
              </div>

              {/* 3-dot */}
              <div className="absolute right-4 top-4">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === addr._id ? null : addr._id)
                  }
                >
                  <FaEllipsisV />
                </button>

                {activeMenu === addr._id && (
                  <div className="absolute right-0 mt-2 bg-white border shadow rounded w-28 z-10">
                    <button
                      onClick={() => handleEdit(addr)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr._id)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
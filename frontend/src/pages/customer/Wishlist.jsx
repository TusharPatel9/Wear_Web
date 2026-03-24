import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance.js";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishData, setWishData] = useState([]);
  const navigate = useNavigate()

  const getWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist/");
      setWishData(response.data.data.products);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const removeItemFromWishlist = async (productId) => {
    try {
      const res = await axiosInstance.post("/wishlist/remove", {
        productId,
      });

      setWishData((prev) => prev.filter((item) => item._id !== productId));
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-screen">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-8">
        My Wishlist{" "}
        <span className="text-gray-500 text-base">{wishData.length} items</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {wishData?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative"
          >
            {/* Wishlist Button */}
            <div
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full shadow cursor-pointer"
              onClick={() => removeItemFromWishlist(item._id)}
            >
              <RxCross2
                size={24}
                className={`text-lg transitio text-gray-800`}
              />
            </div>

            <img
              src={item.imagePaths[0]}
              alt={item.title}
              className="h-84 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-teal-600 font-bold mb-4">₹ {item.price}</p>

              <button onClick={()=>navigate("/cart")} className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition">
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

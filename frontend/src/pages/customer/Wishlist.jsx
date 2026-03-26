import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance.js";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishData, setWishData] = useState([]);
  const navigate = useNavigate();

  const getWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist/");
      setWishData(response.data.data.products);
    } catch (error) {
      toast.error(error.response?.data?.message);
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

  // ✅ MOVE TO CART FUNCTION
  const moveToCart = async (item) => {
    try {
      // 1️⃣ Add to cart
      await axiosInstance.post("/cart/add", {
        productId: item._id,
        quantity: 1,
        size: item.size?.length > 0 ? item.size[0] : "", // default size
      });

      // 2️⃣ Remove from wishlist
      await axiosInstance.post("/wishlist/remove", {
        productId: item._id,
      });

      // 3️⃣ Update UI instantly
      setWishData((prev) => prev.filter((p) => p._id !== item._id));
      toast.success("Moved to cart");
      window.location.href = "/cart";
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to move item");
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="px-6 py-8 bg-gray-100 min-h-[calc(100vh-64px)]">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-8">
        My Wishlist{" "}
        <span className="text-gray-500 text-base">{wishData.length} items</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-6">
        {wishData?.map((item) => (
          <div key={item._id} className="group cursor-pointer">
            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.imagePaths[0]}
                className="h-72  w-full object-cover"
              />

              {/* ❌ Remove Button (same position as wishlist heart) */}
              <div
                onClick={() => removeItemFromWishlist(item._id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
              >
                <RxCross2 className="text-gray-800" />
              </div>

              {/* ⭐ Rating (same as your product card) */}
              <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 flex items-center gap-1 shadow">
                <span className="text-green-600 text-xs">★</span>
                4.3 | 2.4k
              </div>
            </div>

            {/* INFO */}
            <div className="mt-2 mb-3">
              <h3 className="text-sm font-semibold">{item.brand || "Brand"}</h3>

              <p className="text-xs text-gray-500 truncate">{item.title}</p>

              <p className="text-sm font-semibold mt-1">
                ₹{item.price}
                <span className="text-gray-400 line-through text-xs ml-2">
                  ₹{item.price + 300}
                </span>
                <span className="text-orange-500 text-xs ml-2">(30% OFF)</span>
              </p>
            </div>

            {/* ✅ Move to Cart button (replacing Buy Now) */}
            <button
              onClick={() => moveToCart(item)}
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

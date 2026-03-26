import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";

export default function SearchPage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("query");

  const fetchSearchResults = async () => {
    try {
      const res = await axiosInstance.get(`/product/search?query=${query}`);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await axiosInstance.get("/wishlist/");

      const products = response.data.data.products;

      // convert to array of IDs
      const productIds = products.map((item) => item._id);

      setWishlist(productIds);

      console.log("wishlist ids:", productIds);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
      } else {
        if (wishlist?.includes(productId)) {
          // 👉 REMOVE API
          await axiosInstance.post("/wishlist/remove", {
            productId,
          });

          setWishlist((prev) => prev.filter((item) => item !== productId));
        } else {
          // 👉 ADD API
          await axiosInstance.post("/wishlist/add-to-wishlist", {
            productId,
          });

          setWishlist((prev) => [...prev, productId]);
        }
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (query) fetchSearchResults();
  }, [query]);

  return (
    <div className="p-6 mt-16">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
            alt="no product"
            className="w-40 mb-4 opacity-70"
          />

          <h2 className="text-xl font-semibold text-gray-700">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with different keywords or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5  gap-6">
          {products.map((item) => (
            <div key={item._id} className="group cursor-pointer">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.imagePaths[0]}
                  className="h-72 w-full object-cover"
                />

                {/* Wishlist */}
                <div
                  onClick={() => toggleWishlist(item._id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <FaHeart
                    className={
                      wishlist.includes(item._id)
                        ? "text-red-500"
                        : "text-gray-300"
                    }
                  />
                </div>

                {/* Rating */}
                <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 flex items-center gap-1 shadow">
                  <FaStar className="text-green-600 text-xs" />
                  4.3 | 2.4k
                </div>
              </div>

              {/* INFO */}
              <div className="mt-2 mb-3">
                <h3 className="text-sm font-semibold">
                  {item.brand || "Brand"}
                </h3>
                <p className="text-xs text-gray-500 truncate">{item.title}</p>

                <p className="text-sm font-semibold mt-1">
                  ₹{item.price}
                  <span className="text-gray-400 line-through text-xs ml-2">
                    ₹{item.price + 300}
                  </span>
                  <span className="text-orange-500 text-xs ml-2">
                    (30% OFF)
                  </span>
                </p>
              </div>

              <button
                onClick={() => navigate(`/productdetail/${item._id}`)}
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

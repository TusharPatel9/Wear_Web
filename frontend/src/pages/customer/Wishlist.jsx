// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../AxiosInstance.js";
// import { RxCross2 } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";

// export default function Wishlist() {
//   const [wishData, setWishData] = useState([]);
//   const navigate = useNavigate();

//   const getWishlist = async () => {
//     try {
//       const response = await axiosInstance.get("/wishlist/");
//       setWishData(response.data.data.products);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const removeItemFromWishlist = async (productId) => {
//     try {
//       const res = await axiosInstance.post("/wishlist/remove", {
//         productId,
//       });

//       setWishData((prev) => prev.filter((item) => item._id !== productId));
//       toast.success(res.data.message);
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     getWishlist();
//   }, []);

//   return (
//     <div className="px-6 py-8 bg-gray-100 min-h-[calc(100vh-64px)]">
//       {/* Title */}
//       <h2 className="text-2xl font-semibold mb-8">
//         My Wishlist{" "}
//         <span className="text-gray-500 text-base">{wishData.length} items</span>
//       </h2>

//       {/* Grid */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition relative max-w-[290px]">
//         {wishData?.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative"
//           >
//             {/* Wishlist Button */}
//             <div
//               className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full shadow cursor-pointer"
//               onClick={() => removeItemFromWishlist(item._id)}
//             >
//               <RxCross2
//                 size={24}
//                 className={`text-lg transitio text-gray-800`}
//               />
//             </div>

//             <img
//               src={item.imagePaths[0]}
//               alt={item.title}
//               className="h-60 w-full object-cover"
//             />

//             <div className="p-4">
//               <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//               <p className="text-teal-600 font-bold mb-4">₹ {item.price}</p>

//               <button
//                 onClick={() => navigate("/cart")}
//                 className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
//               >
//                 Move to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishData?.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative"
          >
            {/* Remove Button */}
            <div
              className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full shadow cursor-pointer"
              onClick={() => removeItemFromWishlist(item._id)}
            >
              <RxCross2 size={20} className="text-gray-800" />
            </div>

            <img
              src={item.imagePaths[0]}
              alt={item.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

              <p className="text-teal-600 font-bold mb-4">₹ {item.price}</p>

              {/* ✅ MOVE TO CART BUTTON */}
              <button
                onClick={() => {
                  moveToCart(item);
                }}
                className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axiosInstance from "../../AxiosInstance";
// import { FaHeart, FaStar } from "react-icons/fa";

// function CategoryProducts() {
//   const { categoryId } = useParams();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [minPrice, setMinPrice] = useState(100);
//   const [maxPrice, setMaxPrice] = useState(10000);
//   const [selectedColors, setSelectedColors] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [sort, setSort] = useState("");

//   const [page, setPage] = useState(1);
//   const limit = 8;
//   const [totalPages, setTotalPages] = useState(1);

//   const getProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axiosInstance.get(
//         `/product/category/${categoryId}?page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&colors=${selectedColors.join(
//           ","
//         )}&brands=${selectedBrands.join(",")}`
//       );
//       setProducts(res.data.data);
//       setTotalPages(res.data.totalPages);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleColorChange = (color) => {
//     if (selectedColors.includes(color)) {
//       setSelectedColors(selectedColors.filter((c) => c !== color));
//     } else {
//       setSelectedColors([...selectedColors, color]);
//     }
//   };

//   const handleBrandChange = (brand) => {
//     if (selectedBrands.includes(brand)) {
//       setSelectedBrands(selectedBrands.filter((b) => b !== brand));
//     } else {
//       setSelectedBrands([...selectedBrands, brand]);
//     }
//   };

//   const getWishlist = async () => {
//     const res = await axiosInstance.get("/wishlist/");
//     const ids = res.data.data.products.map((i) => i._id);
//     setWishlist(ids);
//   };

//   const toggleWishlist = async (id) => {
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/login");

//     if (wishlist.includes(id)) {
//       await axiosInstance.post("/wishlist/remove", { productId: id });
//       setWishlist((prev) => prev.filter((i) => i !== id));
//     } else {
//       await axiosInstance.post("/wishlist/add-to-wishlist", {
//         productId: id,
//       });
//       setWishlist((prev) => [...prev, id]);
//     }
//   };

//   useEffect(() => {
//     getWishlist();
//   }, []);

//   useEffect(() => {
//     getProducts();
//   }, [
//     categoryId,
//     page,
//     minPrice,
//     maxPrice,
//     sort,
//     selectedColors,
//     selectedBrands,
//   ]);
//   return (
//     <div className="bg-white px-8 py-4">
//       {/* 🔥 TITLE */}
//       <h2 className="text-base font-semibold mb-4">
//         Men T-Shirts{" "}
//         <span className="text-gray-400 font-normal">
//           - {products.length} items
//         </span>
//       </h2>

//       {/* 🔥 FILTER HEADER */}
//       <div className="flex justify-between items-center border-b border-gray-300 pb-2">
//         <h3 className="text-lg font-semibold">FILTERS</h3>

//         {/* SORT */}
//         <select
//           onChange={(e) => setSort(e.target.value)}
//           className="border text-sm px-4 py-2 rounded-md border-gray-300"
//         >
//           <option value="">Sort by: Recommended</option>
//           <option value="low">Price: Low → High</option>
//           <option value="high">Price: High → Low</option>
//           <option value="new">Newest</option>
//         </select>
//       </div>

//       <div className="flex">
//         {/* 🔥 SIDEBAR */}
//         <div className="w-[240px] h-screen pr-6 border-r border-gray-300">
//           {/* BRAND */}
//           <div className="mb-4 mt-4 border-b border-gray-300 pb-4">
//             <h4 className="text-md font-semibold mb-2 text-black">BRAND</h4>
//             <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
//               {["Roadster", "HRX", "Tommy Hilfiger", "Levis", "Puma"].map(
//                 (brand) => (
//                   <label
//                     key={brand}
//                     className="flex items-center gap-2 cursor-pointer"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       onChange={() => handleBrandChange(brand)}
//                       className="accent-teal-600"
//                     />
//                     <span>{brand}</span>
//                   </label>
//                 )
//               )}
//             </div>
//           </div>

//           {/* PRICE */}
//           <div className="border-b border-gray-300 pb-4">
//             <h4 className="text-md font-semibold mb-2 text-black">PRICE</h4>
//             <input
//               type="range"
//               min="100"
//               max="10000"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               className="w-full accent-teal-600"
//             />
//             <p className="text-sm mt-1 text-black">
//               ₹{minPrice} - ₹{maxPrice}+
//             </p>
//           </div>

//           {/* 🔥 COLOR FILTER */}
//           <div className="mb-6">
//             <h4 className="text-md font-semibold mb-2 mt-4 text-black">
//               COLOR
//             </h4>

//             <div className="space-y-2 text-sm">
//               {[
//                 { name: "Black", code: "#000" },
//                 { name: "White", code: "#fff" },
//                 { name: "Blue", code: "#3b82f6" },
//                 { name: "Red", code: "#ef4444" },
//                 { name: "Green", code: "#22c55e" },
//               ].map((color) => (
//                 <label
//                   key={color.name}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   {/* Checkbox */}
//                   <input
//                     type="checkbox"
//                     checked={selectedColors.includes(color.name)}
//                     onChange={() => handleColorChange(color.name)}
//                     className="accent-teal-600"
//                   />

//                   {/* Color Circle */}
//                   <span
//                     className="w-4 h-4 rounded-full border"
//                     style={{ backgroundColor: color.code }}
//                   ></span>

//                   {/* Label */}
//                   <span>{color.name}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* 🔥 PRODUCTS */}
//         <div className="flex-1 pl-6 mt-4">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="grid grid-cols-4 gap-6">
//               {products.map((item) => (
//                 <div key={item._id} className="group cursor-pointer">
//                   {/* IMAGE */}
//                   <div className="relative">
//                     <img
//                       src={item.imagePaths[0]}
//                       className="h-72 w-full object-cover"
//                     />

//                     {/* Wishlist */}
//                     <div
//                       onClick={() => toggleWishlist(item._id)}
//                       className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
//                     >
//                       <FaHeart
//                         className={
//                           wishlist.includes(item._id)
//                             ? "text-red-500"
//                             : "text-gray-300"
//                         }
//                       />
//                     </div>

//                     {/* Rating */}
//                     <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 flex items-center gap-1 shadow">
//                       <FaStar className="text-green-600 text-xs" />
//                       4.3 | 2.4k
//                     </div>
//                   </div>

//                   {/* INFO */}
//                   <div className="mt-2 mb-3">
//                     <h3 className="text-sm font-semibold">
//                       {item.brand || "Brand"}
//                     </h3>
//                     <p className="text-xs text-gray-500 truncate">
//                       {item.title}
//                     </p>

//                     <p className="text-sm font-semibold mt-1">
//                       ₹{item.price}
//                       <span className="text-gray-400 line-through text-xs ml-2">
//                         ₹{item.price + 300}
//                       </span>
//                       <span className="text-orange-500 text-xs ml-2">
//                         (30% OFF)
//                       </span>
//                     </p>
//                   </div>

//                   <button
//                     onClick={() => navigate(`/productdetail/${item._id}`)}
//                     className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
//                   >
//                     Buy Now
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* 🔥 PAGINATION */}
//           <div className="flex justify-center mt-10 gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className="px-4 py-1 border text-sm"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setPage(i + 1)}
//                 className={`px-4 py-1 text-sm border ${
//                   page === i + 1 ? "bg-black text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//               className="px-4 py-1 border text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CategoryProducts;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { FaHeart, FaStar } from "react-icons/fa";

function CategoryProducts() {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);
  const limit = 8;
  const [totalPages, setTotalPages] = useState(1);

  // 🔥 FETCH PRODUCTS
  const getProducts = async () => {
    try {
      setLoading(true);

      const url = `/product/category/${categoryId}?page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}${
        sort ? `&sort=${sort}` : ""
      }${selectedColors.length ? `&colors=${selectedColors.join(",")}` : ""}${
        selectedBrands.length ? `&brands=${selectedBrands.join(",")}` : ""
      }`;

      const res = await axiosInstance.get(url);

      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTER HANDLERS
  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // 🔥 WISHLIST
  const getWishlist = async () => {
    const res = await axiosInstance.get("/wishlist/");
    const ids = res.data.data.products.map((i) => i._id);
    setWishlist(ids);
  };

  const toggleWishlist = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (wishlist.includes(id)) {
      await axiosInstance.post("/wishlist/remove", { productId: id });
      setWishlist((prev) => prev.filter((i) => i !== id));
    } else {
      await axiosInstance.post("/wishlist/add-to-wishlist", {
        productId: id,
      });
      setWishlist((prev) => [...prev, id]);
    }
  };

  // 🔥 RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setPage(1);
  }, [selectedColors, selectedBrands, sort, minPrice, maxPrice]);

  useEffect(() => {
    getWishlist();
  }, []);

  useEffect(() => {
    getProducts();
  }, [
    categoryId,
    page,
    minPrice,
    maxPrice,
    sort,
    selectedColors,
    selectedBrands,
  ]);

  return (
    <div className="bg-white px-8 py-4">
      {/* 🔥 TITLE */}
      <h2 className="text-base font-semibold mb-4">
        Products{" "}
        <span className="text-gray-400 font-normal">
          - {products.length} items
        </span>
      </h2>

      {/* 🔥 FILTER HEADER */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2">
        <h3 className="text-lg font-semibold">FILTERS</h3>

        <select
          onChange={(e) => setSort(e.target.value)}
          className="border text-sm px-4 py-2 rounded-md border-gray-300"
        >
          <option value="">Sort by: Recommended</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="new">Newest</option>
        </select>
      </div>

      <div className="flex">
        {/* 🔥 SIDEBAR */}
        <div className="w-[240px] h-screen pr-6 border-r border-gray-300">
          {/* BRAND */}
          <div className="mb-4 mt-4 border-b border-gray-300 pb-4">
            <h4 className="text-md font-semibold mb-2">BRAND</h4>
            <div className="space-y-2 text-sm max-h-40 overflow-y-auto">
              {["U.S. POLO", "HRX", "Tommy Hilfiger", "Levis", "Puma"].map(
                (brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="accent-teal-600"
                    />
                    <span>{brand}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* PRICE */}
          <div className="border-b border-gray-300 pb-4">
            <h4 className="text-md font-semibold mb-2">PRICE</h4>
            <input
              type="range"
              min="100"
              max="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full accent-teal-600"
            />
            <p className="text-sm mt-1">
              ₹{minPrice} - ₹{maxPrice}+
            </p>
          </div>

          {/* COLOR */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2 mt-4">COLOR</h4>

            {[
              { name: "Black", code: "#000" },
              { name: "White", code: "#fff" },
              { name: "Blue", code: "#3b82f6" },
              { name: "Red", code: "#ef4444" },
              { name: "Navy", code: "#000042" },
            ].map((color) => (
              <label key={color.name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color.name)}
                  onChange={() => handleColorChange(color.name)}
                  className="accent-teal-600"
                />

                <span
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color.code }}
                ></span>

                <span>{color.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 🔥 PRODUCTS */}
        <div className="flex-1 pl-6 mt-4">
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="bg-gray-100 p-6 rounded-full text-3xl mb-4">
                🔍
              </div>

              <h2 className="text-xl font-semibold">No Products Found</h2>

              <p className="text-gray-500 mt-2">Try changing filters</p>

              <button
                onClick={() => {
                  setSelectedBrands([]);
                  setSelectedColors([]);
                  setMinPrice(100);
                  setMaxPrice(10000);
                  setSort("");
                  setPage(1);
                }}
                className="mt-4 bg-teal-600 text-white px-6 py-2 rounded"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((item) => (
                <div key={item._id} className="group cursor-pointer">
                  {/* IMAGE */}
                  <div className="relative">
                    <img
                      src={item.imagePaths[0]}
                      className="h-72 w-full object-cover"
                    />

                    {/* ❤️ Wishlist */}
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

                    {/* ⭐ Rating */}
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

                    <p className="text-xs text-gray-500 truncate">
                      {item.title}
                    </p>

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
                    className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 🔥 PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-1 border text-sm"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-1 text-sm border ${
                    page === i + 1 ? "bg-black text-white" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-1 border text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;

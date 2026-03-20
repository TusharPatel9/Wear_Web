import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Products() {
  const [productData, setProductData] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axiosInstance.get("/product/product-by-seller");
      console.log(res.data); // check structure
      setProductData(res.data.data); //  fix
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
  <div className="p-4 bg-gray-100 min-h-screen">
    <h2 className="text-xl font-semibold mb-4">Products</h2>

    {/* Header */}
    <div className="hidden md:grid grid-cols-7 bg-black text-white p-3 rounded-md font-semibold text-sm">
      <p>Images</p>
      <p>Title</p>
      <p>Price</p>
      <p>Colors</p>
      <p>Stock</p>
      <p className="text-center">Update</p>
      <p className="text-center">Delete</p>
    </div>

    {/* Product List */}
    <div className="space-y-4 mt-4">
      {productData?.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-md shadow-sm p-4"
        >
          {/* Desktop Layout */}
          <div className="hidden md:grid grid-cols-7 items-center gap-4">

            {/* Images */}
            <div className="grid grid-cols-2 gap-2">
              {product.imagePaths.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="h-16 w-16 object-cover rounded"
                />
              ))}
            </div>

            {/* Title */}
            <p className="text-sm font-medium">{product.title}</p>

            {/* Price */}
            <p className="text-sm">₹{product.price}</p>

            {/* Colors */}
            <div className="flex flex-wrap gap-1">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {color}
                </span>
              ))}
            </div>

            {/* Stock */}
            <p
              className={`text-sm font-medium ${
                product.quantity > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.quantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK"}
            </p>

            {/* Edit */}
            <div className="flex justify-center">
              <FaRegEdit className="text-green-600 cursor-pointer text-lg" />
            </div>

            {/* Delete */}
            <div className="flex justify-center">
              <MdDelete className="text-red-500 cursor-pointer text-lg" />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-3">

            {/* Images */}
            <div className="flex gap-2 flex-wrap">
              {product.imagePaths.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  className="h-16 w-16 object-cover rounded"
                />
              ))}
            </div>

            <p className="font-medium">{product.title}</p>
            <p className="text-sm">₹{product.price}</p>

            <div className="flex flex-wrap gap-2">
              {product.colors.map((color, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {color}
                </span>
              ))}
            </div>

            <p
              className={`text-sm font-medium ${
                product.quantity > 0
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {product.quantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK"}
            </p>

            <div className="flex gap-4">
              <FaRegEdit className="text-green-600 text-lg cursor-pointer" />
              <MdDelete className="text-red-500 text-lg cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

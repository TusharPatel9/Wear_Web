import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { IoIosStar } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { toast } from "react-toastify";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [token, setToken] = useState();
  //   const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleQty = (type) => {
    if (type === "inc") {
      setQty((prev) => prev + 1);
    } else {
      if (qty > 1) setQty((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    // ✅ Size validation
    if (product.size?.length > 0 && !selectedSize) {
      setError("Please select a size");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/cart/add", {
        productId: productId,
        quantity: qty,
        size: selectedSize,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getProductDetailById = async () => {
    try {
      const response = await axiosInstance.get(
        `/product/product-by-id/${productId}`
      );
      setProduct(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getProductDetailById();
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    } else {
      setToken(null);
    }
  }, []);
  useEffect(() => {
    if (product?.imagePaths?.length > 0) {
      setSelectedImage(product.imagePaths[0]);
    }
  }, [product]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT - IMAGES */}
        <div>
          {/* Main Image */}
          <div className="border rounded-xl overflow-hidden">
            <img
              src={selectedImage}
              alt="product"
              className="w-full h-[600px] object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product?.imagePaths?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  selectedImage === img ? "border-black" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {product?.title}
          </h1>

          <p className="text-gray-500">{product?.description}</p>
          <div className="flex items-center gap-3 mt-2">
            {/* Rating Badge */}
            <div className="flex items-center gap-1 bg-teal-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
              <span>4</span>
              <IoIosStar className="text-white text-sm" />
            </div>

            {/* Reviews */}
            <p className="text-gray-600 text-sm font-medium">358 Reviews</p>
          </div>
          <div className="text-2xl font-bold text-black">₹{product?.price}</div>

          <div className="mt-3 space-y-3">
            <div className="flex items-center gap-3 text-gray-700">
              <FaCheckCircle className="text-teal-600 text-lg" />
              <p className="text-sm font-medium">Authentic & Quality Assured</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <FaTruck className="text-teal-600 text-lg" />
              <p className="text-sm font-medium">Free Shipping & Returns</p>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <MdPayment className="text-teal-600 text-lg" />
              <p className="text-sm font-medium">Pay on Delivery Available</p>
            </div>
          </div>

          {/* SIZE */}
          {product?.size?.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Select Size</h3>
              <div className="flex gap-2 flex-wrap">
                {product?.size.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSize(s);
                      setError(""); // clear error instantly
                    }}
                    className={`px-4 py-1 border rounded-lg ${
                      selectedSize === s ? "bg-gray-400 text-white" : "bg-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
            </div>
          )}

          {/* STOCK */}
          <p className="text-sm text-teal-900">
            {product?.quantity < 0 && "Out of stock"}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={() => (token ? handleAddToCart() : navigate("/login"))}
            className="bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

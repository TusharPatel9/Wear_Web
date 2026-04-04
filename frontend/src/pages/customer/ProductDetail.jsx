import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { IoIosStar } from "react-icons/io";
import { FaCheckCircle, FaTruck } from "react-icons/fa";
import { MdPayment, MdOutlineLocalOffer } from "react-icons/md";
import { toast } from "react-toastify";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [token, setToken] = useState();
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
      console.log(error.response?.data?.message);
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
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT - IMAGES GALLERY */}
        <div className="flex flex-col-reverse md:flex-row gap-5">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 no-scrollbar">
            {product?.imagePaths?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-24 object-cover cursor-pointer hover:border-gray-800 transition-all ${
                  selectedImage === img ? "border-2 border-black" : "border border-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full flex-grow bg-gray-50 flex items-center justify-center relative overflow-hidden">
            <img
              src={selectedImage}
              alt={product?.title || "Product Image"}
              className="w-full h-full object-cover max-h-[750px]"
            />
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="flex flex-col">
          {/* Breadcrumbs or Brand */}
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">
            {product?.brand || "WEAR WEB COLLECTION"}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {product?.title}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-black">₹{product?.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{(product?.price || 0) + 300}</span>
            <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">
              30% OFF
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product?.description}
          </p>

          <div className="h-px bg-gray-200 w-full mb-8"></div>

          {/* SIZES */}
          {product?.size?.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wide">Select Size</h3>
                <span className="text-xs text-gray-500 underline cursor-pointer hover:text-black">Size Guide</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product?.size.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedSize(s);
                      setError("");
                    }}
                    className={`w-14 h-14 flex items-center justify-center border font-medium transition-all ${
                      selectedSize === s 
                        ? "border-black bg-primary text-white" 
                        : "border-gray-200 text-gray-700 bg-white hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-sm font-medium mt-3">{error}</p>
              )}
            </div>
          )}

          {/* STOCK STATUS */}
          {product?.quantity <= 0 && (
             <p className="text-sm font-semibold text-red-500 mb-6 uppercase tracking-wide">
               Out of stock
             </p>
          )}

          {/* ADD TO CART & WISHLIST */}
          <div className="flex gap-4 mb-10 w-full mt-auto">
            <button
              onClick={() => (token ? handleAddToCart() : navigate("/login"))}
              className="flex-grow bg-primary text-white py-4 text-sm font-semibold tracking-widest uppercase hover:bg-primary/90 transition-colors shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={product?.quantity <= 0}
            >
              Add to Cart
            </button>
          </div>

          <div className="h-px bg-gray-200 w-full mb-8"></div>

          {/* PRODUCT PERKS */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 text-gray-800">
              <FaCheckCircle className="text-xl mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Authentic & Quality Assured</p>
                <p className="text-xs text-gray-500 mt-1">100% Genuine products</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-800">
              <FaTruck className="text-xl mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-gray-500 mt-1">On all orders</p>
              </div>
            </div>

            <div className="flex items-start gap-4 text-gray-800">
              <MdPayment className="text-xl mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Pay on Delivery Available</p>
                <p className="text-xs text-gray-500 mt-1">Cash on delivery</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

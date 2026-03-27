import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstance";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FaHeart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
];

function HomePage() {
  const [current, setCurrent] = useState(0);
  const [productData, setProductData] = useState();
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  // Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(`/product/products?limit=12`);
      setProductData(response.data.data);
    } catch (error) {
      console.log(error.response.data.message);
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

  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

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

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section
        className="h-[98vh] bg-cover bg-center flex items-center justify-center text-white transition-all duration-700"
        style={{
          backgroundImage: `url(${heroImages[current]})`,
        }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Discover Your Style
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Trendy collections for Men, Women & Kids
          </p>
          <button className="bg-teal-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-teal-700 transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="px-16 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {productData?.map((item) => (
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
                              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                            >
                              Buy Now
                            </button>
                          </div>
                        ))}
        </div>
      </section>

      {/* ================= MORE PRODUCTS SECTION ================= */}
      {/* <section className="px-16 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item) => (
            <div key={item.id} className="text-center group cursor-pointer">
              <img
                src={item.image}
                alt=""
                className="h-52 w-full object-cover rounded-lg group-hover:scale-105 transition"
              />
              <h4 className="mt-3 font-medium">{item.title}</h4>
              <p className="text-teal-600 font-semibold">
                ₹ {item.price}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 px-16 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Wear Web</h3>
            <p>
              Your one-stop shop for premium fashion and lifestyle products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Men</li>
              <li className="hover:text-white cursor-pointer">Women</li>
              <li className="hover:text-white cursor-pointer">Kids</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Subscribe</h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md text-black"
            />
            <button className="mt-3 w-full bg-teal-600 py-2 rounded-md hover:bg-teal-700 transition">
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center mt-10 border-t border-gray-700 pt-6">
          © 2026 Wear Web. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

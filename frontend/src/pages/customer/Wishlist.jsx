import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";

export default function Wishlist() {
    const [wishData, setWishData] = useState([]);

    const getWishlist = async () => {
        try {
            const response = await axiosInstance.get("/wishlist/");
            setWishData(response.data.data.products);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <div className="px-6 py-8 bg-gray-50 min-h-screen">

            {/* Title */}
            <h2 className="text-xl font-semibold mb-8">
                My Wishlist{" "}
                <span className="text-gray-500 text-base">
                    {wishData.length} items
                </span>
            </h2>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                {wishData?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative"

                    >
                        {/* Remove Icon */}
                        <div className="absolute top-3 right-3 z-10">
                            <div className="bg-white rounded-full p-2 shadow-md cursor-pointer hover:scale-110 transition">
                                <FaHeart className="text-gray-500 hover:text-red-500 text-sm" />
                            </div>
                        </div>

                        {/* Image */}
                        <div className="h-72 bg-gray-100">
                            <img
                                src={item.imagePaths[0]}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div className="p-4">
                            <h3 className="text-sm font-medium text-gray-800 truncate">
                                {item.title}
                            </h3>

                            <p className="text-base font-semibold text-gray-900 mt-1">
                                ₹{item.price}
                            </p>
                        </div>

                        {/* Move to Cart */}
                        <div className="border-t">
                            <button className="w-full py-3 text-sm font-semibold text-pink-600 hover:bg-gray-50 transition">
                                MOVE TO BAG
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
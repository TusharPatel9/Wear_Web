import React, { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

function Cart() {
  const [count, setCount] = useState(1);
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 pt-10 md:pt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row gap-4">
            {/* Image */}
            <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/150"
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex gap-2 flex-col">
                  <h2 className="font-semibold text-lg text-gray-600">
                    Turquoise Blue Stonework Satin Designer Saree
                  </h2>
                  <p className="text-sm text-gray-500">
                    Sold by Natural Lifestyle Products Pvt Ltd
                  </p>
                  <p className="text-sm text-gray-500">Quantity : {count}</p>
                </div>

                <button className="text-gray-500 hover:text-red-500">
                  <RxCross2 size={20} />
                </button>
              </div>

              {/* Quantity + Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-gray-400 rounded-lg w-fit">
                  <button
                    onClick={() =>
                      count == 1 ? setCount(1) : setCount(count - 1)
                    }
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-4">{count}</span>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="px-3 py-1 hover:bg-gray-100"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Price */}
                <div className="text-lg font-semibold text-gray-800">₹6897</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="space-y-4">
          {/* Price Details */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="font-semibold">Price Details</h3>

            <div className="flex justify-between text-md">
              <span>Subtotal</span>
              <span>₹9597</span>
            </div>

            <div className="flex justify-between text-md ">
              <span>Discount</span>
              <span>-₹2700</span>
            </div>

            <div className="flex justify-between text-md">
              <span>Shipping</span>
              <span>₹79</span>
            </div>

            <div className="flex justify-between text-md ">
              <span>Platform Fee</span>
              <span className="text-teal-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹6897</span>
            </div>

            {/* Button */}
            <button className="w-full mt-3 bg-teal-600 hover:bg-teal-800 text-white py-3 rounded-lg font-semibold transition">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

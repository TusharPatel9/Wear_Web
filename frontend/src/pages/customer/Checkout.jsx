import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../AxiosInstance";
import { assets } from "../../assets/assets";

function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("");
  const [cart, setCart] = useState(null);

  // Address Form State
  const [formData, setFormData] = useState({
    area: "",
    city: "",
    state: "",
    pincode: "",
    mobile: ""
  });

  const fetchData = async () => {
    try {
      const [addressRes, cartRes] = await Promise.all([
        axiosInstance.get("/address/get-address").catch(() => ({ data: { data: [] } })),
        axiosInstance.get("/cart").catch(() => ({ data: null }))
      ]);

      if (addressRes?.data?.data) {
        setAddresses(addressRes.data.data);
        if (addressRes.data.data.length > 0) {
          setSelectedAddress(addressRes.data.data[0]._id);
        } else {
          setShowAddressForm(true); // show form by default if no addresses
        }
      }

      if (cartRes?.data?.data) {
        setCart(cartRes.data.data);
      }
    } catch (error) {
      toast.error("Error loading checkout details.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitAddress = async (e) => {
    e.preventDefault();
    if (!formData.area || !formData.city || !formData.state || !formData.pincode || !formData.mobile) {
      toast.warn("Please fill all fields for the address.");
      return;
    }

    try {
      const res = await axiosInstance.post("/address/add-address", formData);
      if (res.data.success) {
        toast.success("Address added successfully!");
        setFormData({ area: "", city: "", state: "", pincode: "", mobile: "" });
        setShowAddressForm(false);
        fetchData(); // Refetch addresses
      }
    } catch (err) {
      toast.error("Failed to add address.");
    }
  };

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.warn("Please select a delivery address.");
      return;
    }
    if (!paymentGateway) {
      toast.warn("Please choose a payment gateway.");
      return;
    }
    
    toast.info(`Proceeding to pay with ${paymentGateway}`);
    // Future payment gateway logic will go here
  };

  const totalPrice = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  if (!cart) return <p className="text-center mt-10">Loading checkout...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 md:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SECTION - ADDRESSES */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-white p-5 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Select Delivery Address</h2>
            {!showAddressForm && (
              <button 
                onClick={() => setShowAddressForm(true)}
                className="text-teal-600 border border-teal-600 px-4 py-2 rounded font-semibold text-sm hover:bg-teal-50 transition"
              >
                ADD NEW ADDRESS
              </button>
            )}
          </div>

          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Saved Addresses</p>

          {!showAddressForm ? (
            <div className="space-y-4">
              {addresses.map((address) => (
                <label 
                  key={address._id}
                  className={`block border p-5 rounded-md cursor-pointer transition ${selectedAddress === address._id ? 'border-teal-600 bg-teal-50/30' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                >
                  <div className="flex items-start gap-4">
                    <input 
                      type="radio" 
                      name="deliveryAddress" 
                      className="mt-1 w-4 h-4 text-teal-600 focus:ring-teal-500"
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                    />
                    <div>
                      <p className="font-semibold text-gray-700">{address.area}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-gray-500">Mobile: <span className="font-medium text-gray-700">{address.mobile}</span></p>
                    </div>
                  </div>
                </label>
              ))}

            </div>
          ) : (
            <form onSubmit={submitAddress} className="bg-white p-6 border border-gray-200 rounded-md shadow-sm space-y-5">
              <h3 className="font-semibold text-gray-700 mb-4 border-b pb-2">Add New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" name="area" placeholder="Locality / Area / Street" required
                  value={formData.area} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input 
                  type="text" name="city" placeholder="City" required
                  value={formData.city} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input 
                  type="text" name="state" placeholder="State" required
                  value={formData.state} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input 
                  type="text" name="pincode" placeholder="Pincode" required
                  value={formData.pincode} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input 
                  type="text" name="mobile" placeholder="Mobile Number" required
                  value={formData.mobile} onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none md:col-span-2"
                />
              </div>
              
              <div className="flex gap-4 mt-6">
                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 font-semibold transition">
                  SAVE ADDRESS
                </button>
                {addresses.length > 0 && (
                  <button type="button" onClick={() => setShowAddressForm(false)} className="text-gray-500 hover:text-gray-700 px-4 py-2 font-medium">
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          )}

        </div>

        {/* RIGHT SECTION - PAYMENT & SUMMARY */}
        <div className="space-y-6">
          
          {/* Payment Methods */}
          <div className="bg-white p-6 border border-gray-200 rounded-md shadow-sm">
            <h3 className="text-center font-semibold text-teal-600 mb-6 text-lg">Choose Payment Method</h3>
            <div className="flex justify-center gap-4">
              <label className={`flex flex-1 items-center justify-center gap-3 border px-6 py-2  rounded-md cursor-pointer transition ${paymentGateway === 'razorpay' ? 'border-teal-600 shadow-sm bg-teal-50/20' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" name="paymentGateway" 
                  checked={paymentGateway === 'razorpay'} 
                  onChange={() => setPaymentGateway('razorpay')}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 flex-shrink-0"
                />
                <img src={assets.razorpay_img} alt="Razorpay" className="w-32 object-contain" />
              </label>

              <label className={`flex flex-1 items-center justify-center gap-2 border px-4 py-3 rounded-md cursor-pointer transition ${paymentGateway === 'cod' ? 'border-teal-600 shadow-sm bg-teal-50/20' : 'border-gray-200 hover:border-gray-300'}`}>
                <input 
                  type="radio" name="paymentGateway" 
                  checked={paymentGateway === 'cod'} 
                  onChange={() => setPaymentGateway('cod')}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                />
                <span className="font-bold text-gray-700 tracking-wide text-sm whitespace-nowrap">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 space-y-4">
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Subtotal</span>
              <span>₹ {totalPrice}</span>
            </div>
            {/* The screenshot shows discount as 2700 but since we don't have discount logic, tracking standard structure */}
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Discount</span>
              <span>₹ 0</span>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <span>Shipping</span>
              <span>₹ 0</span>
            </div>
            <div className="flex justify-between text-gray-700 font-medium">
              <span>platform fee</span>
              <span className="text-teal-600">Free</span>
            </div>

            <hr className="my-2 border-gray-200" />

            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-[#0a8069] hover:bg-[#086a55] text-white py-3 rounded-md font-semibold tracking-wide transition shadow-md"
            >
              CHECKOUT
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Checkout;

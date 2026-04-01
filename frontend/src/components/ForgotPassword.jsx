import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstance";
import { assets } from "../assets/assets";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/forgot-password", { email });
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent to your email!");
        setOtpSent(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/verify-otp", { email, otp });
      if (response.data.success) {
        toast.success("OTP Verified Successfully!");
        // Pass email and otp to reset password screen
        navigate("/reset-password", { state: { email, otp } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full grid md:grid-cols-2 min-h-[550px]">
        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden md:block">
          <img
            src={assets.login_img}
            className="absolute inset-0 w-full h-full object-cover"
            alt="fashion"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-4xl font-bold mb-2">Wear Web</h1>
            <p className="text-sm">Discover trendy fashion for men, women & kids</p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-center text-gray-500 mb-8 max-w-sm mx-auto">
            {!otpSent 
              ? "Enter your email address to receive a OTP for resetting your credentials." 
              : "An OTP has been sent to your email. Please enter it below to verify."}
          </p>

          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition disabled:bg-teal-400"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg px-4 py-3 focus:outline-none cursor-not-allowed"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 tracking-widest text-center text-lg font-semibold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition disabled:bg-teal-400"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}

          {/* BACK TO LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remebered your password? 
            <Link to="/login" className="text-teal-600 ml-1 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../AxiosInstance";
import { assets } from "../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const { email, otp } = location.state || {};

  useEffect(() => {
    // If user accesses this page directly without going through Forgot Password logic
    if (!email || !otp) {
      toast.error("Invalid session. Please request a new OTP.");
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/reset-password", { 
        email, 
        otp, 
        newPassword: passwords.newPassword, 
        confirmPassword: passwords.confirmPassword 
      });

      if (response.data.success) {
        toast.success(response.data.message || "Password reset successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
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
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 text-center mb-8">
            Create New Password
          </h2>

          <form onSubmit={handleResetPassword} className="space-y-5">
            {/* NEW PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={passwords.newPassword}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {/* <div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div> */}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handleInput}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition mt-6 disabled:bg-teal-400"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* BACK TO LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Remembered your password?
            <Link to="/login" className="text-teal-600 ml-1 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const validateSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Please enter a valid email",
      },
    },

    passwordValidator: {
      required: {
        value: true,
        message: "Password is required",
      },
    },
  };

  async function onSubmitHandler(data) {
    try {
      console.log(data);
      const response = await axios.post("/user/login", data);
      console.log(response);
      if (response.status == 200) {
        console.log(response.data);
        const { role, message } = response.data.data;
        toast.success(message);

        // localStorage.setItem()
        // localStorage.setItem()


        console.log("ROLE:", role);

        switch (role) {
          case "customer":
            navigate("/");
            break;

          case "seller":
            navigate("/seller/dashboard");
            break;

          case "admin":
            navigate("/admin/dashboard");
            break;
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  }

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

            <p className="text-sm">
              Discover trendy fashion for men, women & kids
            </p>
          </div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 text-center mb-8">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", validateSchema.emailValidator)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", validateSchema.passwordValidator)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-3 rounded-md hover:bg-teal-800 transition"
            >
              Login
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?
            <Link to="/register" className="text-teal-600 ml-1 font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

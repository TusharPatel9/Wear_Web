import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const [role, setRole] = useState("customer");
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const validateSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "Name is required",
      },
    },

    emailValidator: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Please enter a valid email address",
      },
    },

    passwordValidator: {
      required: {
        value: true,
        message: "Password is required",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character required.",
      },
    },

    shopNameValidator: {
      required: {
        value: true,
        message: "Shop name is required",
      },
    },

    businessEmailValidator: {
      required: {
        value: true,
        message: "Business email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Enter a valid business email",
      },
    },

    gstValidator: {
      required: {
        value: true,
        message: "GST number is required",
      },
    },

    addressValidator: {
      required: {
        value: true,
        message: "Address is required",
      },
    },

    cityValidator: {
      required: {
        value: true,
        message: "City is required",
      },
    },

    stateValidator: {
      required: {
        value: true,
        message: "State is required",
      },
    },

    pincodeValidator: {
      required: {
        value: true,
        message: "Pincode is required",
      },
      pattern: {
        value: /^[0-9]{6}$/,
        message: "Enter valid 6 digit pincode",
      },
    },
  };

  async function onSubmitHandler(data) {
    try {
      data.role = role;
      console.log(data);
      const response = await axios.post("/user/register", data);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  async function nextStep() {
    if (step === 1) {
      const isValid = await trigger(["name", "email", "password"]);
      if (!isValid) return;
    }

    if (step === 2) {
      const isValid = await trigger(["shopName", "businessEmail", "gstNumber"]);
      if (!isValid) return;
    }

    setStep(step + 1);
  }

  function prevStep() {
    setStep(step - 1);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full grid md:grid-cols-2 min-h-[600px]">
        {/* LEFT IMAGE */}
        <div className="relative hidden md:block">
          <img
            src={assets.sign_img}
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

        {/* RIGHT FORM */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-teal-600 text-center mb-6">
            Create Account
          </h2>

          {/* ROLE TOGGLE */}
          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            <button
              type="button"
              className={`w-1/2 py-2 rounded-full ${
                role === "customer" ? "bg-teal-700 text-white" : "text-gray-600"
              }`}
              onClick={() => {
                setRole("customer");
                setStep(1);
              }}
            >
              Customer
            </button>

            <button
              type="button"
              className={`w-1/2 py-2 rounded-full ${
                role === "seller" ? "bg-teal-700 text-white" : "text-gray-600"
              }`}
              onClick={() => {
                setRole("seller");
                setStep(1);
              }}
            >
              Seller
            </button>
          </div>

          {/* STEP INDICATOR */}
          {role === "seller" && (
            <div className="flex justify-between text-sm text-gray-400 mb-6">
              <span className={`${step === 1 && "text-teal-600"} font-medium`}>
                Account
              </span>

              <span className={`${step === 2 && "text-teal-600"} font-medium`}>
                Business
              </span>

              <span className={`${step === 3 && "text-teal-600"} font-medium`}>
                Address
              </span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", validateSchema.nameValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", validateSchema.emailValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", validateSchema.passwordValidator)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-teal-500"
                  />

                  <div
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}

                {role === "seller" ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-teal-700 text-white py-3 rounded-md"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-teal-700 text-white py-3 rounded-md"
                  >
                    Create Account
                  </button>
                )}
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && role === "seller" && (
              <>
                <input
                  type="text"
                  placeholder="Shop Name"
                  {...register("shopName", validateSchema.shopNameValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.shopName && (
                  <p className="text-red-500 text-xs">
                    {errors.shopName.message}
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Business Email"
                  {...register(
                    "businessEmail",
                    validateSchema.businessEmailValidator
                  )}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.businessEmail && (
                  <p className="text-red-500 text-xs">
                    {errors.businessEmail.message}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="GST Number"
                  {...register("gstNumber", validateSchema.gstValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.gstNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.gstNumber.message}
                  </p>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 rounded-md"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-teal-700 text-white rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && role === "seller" && (
              <>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address", validateSchema.addressValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city", validateSchema.cityValidator)}
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 w-full"
                    />

                    {errors.city && (
                      <p className="text-red-500 text-xs">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      {...register("state", validateSchema.stateValidator)}
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 w-full"
                    />

                    {errors.state && (
                      <p className="text-red-500 text-xs">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Pincode"
                  {...register("pincode", validateSchema.pincodeValidator)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />

                {errors.pincode && (
                  <p className="text-red-500 text-xs">
                    {errors.pincode.message}
                  </p>
                )}

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 rounded-md"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-teal-700 text-white rounded-md"
                  >
                    Create Account
                  </button>
                </div>
              </>
            )}
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?
            <Link to="/login" className="text-teal-600 ml-1 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

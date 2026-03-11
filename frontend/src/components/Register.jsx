// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { assets } from "../assets/assets.js";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const { register, handleSubmit, formState: { errors }, } = useForm();

//   const validateSchema = {
//     nameValidator: {
//       required: {
//         value: true,
//         message: "name is required",
//       },
//     },
//     emailValidator: {
//       required: {
//         value: true,
//         message: "email is required",
//       },
//       pattern: {
//         value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
//         message: "Please enter a valid email address",
//       },
//     },
//     passwordValidator: {
//       required: {
//         value: true,
//         message: "password is required",
//       },
//       pattern: {
//         value:
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         message:
//           "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character required.",
//       },
//     },
//   };

//   async function onSubmitHandler(data) {
//     console.log(data);
//     try{
//       const response = await axios.post("/user/register", data);
//       console.log(response)
//       if(response.status == 201){
//         toast.success("User registered successfully")
//         navigate("/login")
//       }
//     }catch(err){
//       toast.error(err.response.data.message)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

//       {/* Card */}
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

//         {/* Top Image Section */}
//         <div
//           className="h-36 bg-cover bg-center relative"
//           style={{ backgroundImage: `url(${assets.sign_img})` }}
//         >
//           <div className="absolute right-6 top-6 text-right">
//             <h2
//               className="text-2xl font-semibold text-black"
//               style={{ fontFamily: "Pacifico, cursive" }}
//             >
//               Wear Web
//             </h2>
//             <p className="text-xs text-gray-600">trendy collection</p>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="px-8 py-10">

//           <h1 className="text-2xl font-semibold text-center text-teal-600 mb-8">
//             Register
//           </h1>

//           <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">

//             {/* Name Field */}
//             <div className="relative">
//               <fieldset className="border-2 border-teal-600 rounded-md px-3 pt-1 pb-2 bg-white">
//                 <legend className="px-2 text-sm text-teal-600">
//                   Enter Your Name
//                 </legend>

//                 <input
//                   type="text"
//                   className="w-full bg-white outline-none text-gray-800 py-1"
//                   {...register("name", validateSchema.nameValidator)}
//                 />
//               </fieldset>

//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="relative">
//               <fieldset className="border-2 border-teal-600 rounded-md px-3 pt-1 pb-2 bg-white">
//                 <legend className="px-2 text-sm text-teal-600">
//                   Enter Your Email
//                 </legend>

//                 <input
//                   type="text"
//                   className="w-full bg-white outline-none text-gray-800 py-1"
//                   {...register("email", validateSchema.emailValidator)}
//                 />
//               </fieldset>

//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="relative">
//               <fieldset className="border-2 border-teal-600 rounded-md px-3 pt-1 pb-2 bg-white relative">
//                 <legend className="px-2 text-sm text-teal-600">
//                   Enter Your Password
//                 </legend>

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full bg-white outline-none text-gray-800 py-1 pr-8"
//                   {...register("password", validateSchema.passwordValidator)}
//                 />

//                 <div
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
//                 </div>
//               </fieldset>

//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="w-full bg-teal-700 text-white py-3 rounded-md
//                        font-semibold shadow-md hover:bg-teal-800 transition"
//             >
//               SIGN UP
//             </button>

//             {/* Login Link */}
//             <p className="text-center text-sm text-gray-600 mt-4">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-teal-600 font-medium hover:underline"
//               >
//                 LOGIN
//               </Link>
//             </p>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { assets } from "../assets/assets";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Register() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const validateSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "name is required",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "Please enter a valid email address",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "password is required",
      },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Minimum 8 characters, 1 uppercase, 1 lowercase, 1 number & 1 special character required.",
      },
    },
  };

  async function onSubmitHandler(data) {
    console.log(data);
    try {
      const response = await axios.post("/user/register", data);
      console.log(response);
      if (response.status == 201) {
        toast.success("User registered successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full grid md:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="relative hidden md:block">
          <img
            src={assets.sign_img}
            className="absolute inset-0 w-full h-full object-cover"
            alt="fashion"
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-4xl font-bold mb-2">Wear Web</h1>

            <p className="text-sm">
              Discover trendy fashion for men, women & kids
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}

        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-teal-600 text-center mb-6">
            Create Account
          </h2>

          {/* TOGGLE */}

          <div className="flex bg-gray-200 rounded-full p-1 mb-6">
            <button
              type="button"
              className="w-1/2 py-2 rounded-full text-gray-600 text-sm font-medium"
            >
              Customer
            </button>

            <button
              type="button"
              className="w-1/2 py-2 rounded-full bg-teal-700 text-white text-sm font-medium"
            >
              Seller
            </button>
          </div>

          {/* STEP TABS */}

          <div className="flex justify-between text-sm text-gray-500 mb-6">
            <span className="text-teal-600 font-medium">Account</span>

            <span>Business</span>

            <span>Address</span>
          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
            {/* FULL NAME */}

            <input
              type="text"
              placeholder="Full Name"
              {...register("name", validateSchema.nameValidator)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email Address"
              {...register("email", validateSchema.emailValidator)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />

            {/* PASSWORD */}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", validateSchema.passwordValidator)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />

              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-lg hover:bg-teal-800 transition"
            >
              Next
            </button>
          </form>

          {/* LOGIN */}

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?
            <span className="text-teal-600 ml-1 cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

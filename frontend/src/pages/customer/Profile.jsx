// import React from "react";
// import { MdEdit } from "react-icons/md";

// function Profile() {
//   const user = {
//     name: "John Doe",
//     email: "john@example.com",
//     password: "********",
//   };

//   return (
//     <div className="w-full">
//       {/* Page Title */}
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile</h2>

//       {/* Profile Card */}
//       <div className="max-w-4xl bg-white rounded-2xl shadow-md p-6">
//         {/* Top Section */}
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-16 h-16 rounded-full bg-[#008060] text-white flex items-center justify-center text-2xl font-bold">
//             J
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
//             <p className="text-gray-500 text-sm">{user.email}</p>
//           </div>
//         </div>

//         {/* Info Fields */}
//         <div className="space-y-5">
//           {/* Name */}
//           <div className="flex justify-between items-center border-b pb-3">
//             <div>
//               <p className="text-sm text-gray-500">Full Name</p>
//               <p className="font-medium text-gray-800">{user.name}</p>
//             </div>
//             <MdEdit className="text-gray-500 cursor-pointer hover:text-[#008060]" />
//           </div>

//           {/* Email */}
//           <div className="flex justify-between items-center border-b pb-3">
//             <div>
//               <p className="text-sm text-gray-500">Email Address</p>
//               <p className="font-medium text-gray-800">{user.email}</p>
//             </div>
//             <MdEdit className="text-gray-500 cursor-pointer hover:text-[#008060]" />
//           </div>
//         </div>

//         {/* Button */}
//         <div className="mt-6">
//           <button className="w-full bg-[#008060] text-white py-2.5 rounded-lg hover:bg-[#00664d] transition font-medium">
//             Update Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import axiosInstance from "../../AxiosInstance";

export default function Profile() {
  const [userData, setUserData] = useState();

  const getCustomerDetail = async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      setUserData(res.data.data.userObj);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCustomerDetail();
  }, []);

  return (
    <div className="w-full p-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl">
        {/* Avatar & Basic Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-[#008060] text-white flex items-center justify-center text-2xl font-bold">
            {userData?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {userData?.name}
            </h3>
            <p className="text-gray-500 text-sm">{userData?.email}</p>
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-medium text-gray-800">{userData?.name}</p>
            </div>
            <MdEdit className="text-gray-500 cursor-pointer hover:text-[#008060]" />
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium text-gray-800">{userData?.email}</p>
            </div>
            <MdEdit className="text-gray-500 cursor-pointer hover:text-[#008060]" />
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Phone</p>
              <p className="font-medium text-gray-800">
                {userData?.phone || "Not added"}
              </p>
            </div>
            <MdEdit className="text-gray-500 cursor-pointer hover:text-[#008060]" />
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6">
          <button className="w-full bg-[#008060] text-white py-2 rounded-lg hover:bg-[#00664d] transition font-medium">
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

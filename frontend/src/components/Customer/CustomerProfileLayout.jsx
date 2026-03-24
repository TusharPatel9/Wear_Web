import React from "react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import CustomerProfileSidebar from "./CustomerProfileSidebar";

function CustomerProfileLayout() {
  return (
    <div className="h-screen flex flex-col bg-[#f1f3f6] overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-300 bg-white">
        <MdMenu className="text-2xl text-[#008060]" />
        <h1 className="text-xl font-semibold text-black">User Profile</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <CustomerProfileSidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileLayout;




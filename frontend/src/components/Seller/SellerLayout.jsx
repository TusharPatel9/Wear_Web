  import React from "react";
  import { Outlet } from "react-router-dom";
  import SellerSidebar from "./SellerSidebar"; // adjust path if needed
  import { MdMenu } from "react-icons/md";

  function SellerLayout() {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="w-full flex items-center gap-4 px-6 py-4 border-b border-gray-200 bg-white">
          <MdMenu className="text-2xl text-gray-600 cursor-pointer" />
          <h1 className="text-xl font-bold tracking-tight text-gray-900 uppercase">
            WEAR WEB <span className="font-sans text-sm font-medium tracking-widest text-secondary ml-2">SELLER</span>
          </h1>
        </div>

        {/* Body Section */}
        <div className="flex flex-1 overflow-hidden bg-gray-50">
          <SellerSidebar />

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }

  export default SellerLayout;

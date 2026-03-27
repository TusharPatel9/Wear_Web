import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import CustomerProfileSidebar from "./CustomerProfileSidebar";

function CustomerProfileLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  // ✅ open sidebar automatically on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true); // desktop
      } else {
        setShowSidebar(false); // mobile
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#f1f3f6] overflow-hidden">

      {/* Header */}
      <div className="w-full flex items-center gap-3 px-6 py-4 border-b border-gray-300 bg-white">
        <MdMenu
          className="text-2xl text-[#008060] cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <h1 className="text-xl font-semibold text-black">User Profile</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ✅ Overlay (mobile only) */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* ✅ Sidebar */}
        <div
          className={`
    fixed lg:static z-40
    top-16 lg:top-0
    left-0
    h-[calc(100%-4rem)] lg:h-full
    w-64 bg-white border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
  `}
        >
          <CustomerProfileSidebar />
        </div>

        {/* ✅ Main Content */}
        <div className="flex-1 p-6 overflow-y-auto w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CustomerProfileLayout;
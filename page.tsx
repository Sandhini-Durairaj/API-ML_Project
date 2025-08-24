"use client";

import React, { useState } from "react";
import { Menu, Upload, FileText } from "lucide-react";
import BookForm from "./features/inputFields";
import DropzonesWithTable from "./features/dropzone";

const navItems = [
  { name: "Upload Fields", icon: Upload },
  { name: "Upload CSV", icon: FileText },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex h-screen  overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-40 bg-gray-100 h-full shadow-md border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        w-14 lg:w-56 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start h-16 border-b border-gray-200 px-2 lg:px-6">
           <img className="h-28 w-28 md:block hidden" src="/icons/logo.png" alt="" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-1 mt-4">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const active = idx === activeIndex;

            return (
              <button
                key={item.name}
                onClick={() => setActiveIndex(idx)}
                className={`group relative flex items-center gap-3 lg:gap-4 py-2.5 cursor-pointer px-3 lg:px-6
                  text-gray-700 hover:text-blue-600 focus:outline-none transition-colors
                  ${active ? "text-blue-600 font-semibold" : ""}
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={1.25}
                  className={`flex-shrink-0 transition-colors duration-200 ${active ? "text-green-600" : "text-gray-500 group-hover:text-blue-600"
                    }`}
                />
                {/* Show label only on lg */}
                <span
                  className={`hidden lg:inline transition-colors duration-200 font-thin ${active ? "text-green-300" : ""
                    }`}
                >
                  {item.name}
                </span>

                {/* Border right only on active */}
                {active && (
                  <span
                    className="absolute top-0 right-0 h-full border-r-2 border-green-600"
                    style={{ width: 4 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-auto">
        {/* Top bar for mobile */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-4 shadow border-b">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700">
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>

        {/* Content */}
        <main className="p-6">
          {
            activeIndex !== 0 ?
              <DropzonesWithTable /> : <BookForm/>
          }
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

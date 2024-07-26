// src/components/Layout.jsx
import React from "react";
import Navbar from "./components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

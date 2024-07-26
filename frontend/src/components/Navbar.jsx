// In src/components/Navbar.jsx

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRocket, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-[#058689] to-[#03303f] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <FaRocket className="h-8 w-8 text-white" />
            <Link
              to={"/"}
              className="ml-2 text-2xl font-bold text-white hover:text-gray-200 transition duration-150"
            >
              onboarding.vip
            </Link>
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <NavItem to="/home">Home</NavItem>
              {isAuthenticated && <NavItem to="/dashboard">Dashboard</NavItem>}
              {isAuthenticated ? (
                <NavItem to="/logout" onClick={handleLogout}>
                  Log out
                </NavItem>
              ) : (
                <NavItem to="/login">Login</NavItem>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavItem to="/home" onClick={() => setIsOpen(false)}>
              Home
            </MobileNavItem>
            {isAuthenticated && (
              <MobileNavItem to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </MobileNavItem>
            )}
            {isAuthenticated ? (
              <MobileNavItem
                to="/logout"
                onClick={(e) => {
                  setIsOpen(false);
                  handleLogout(e);
                }}
              >
                Log out
              </MobileNavItem>
            ) : (
              <MobileNavItem to="/login" onClick={() => setIsOpen(false)}>
                Login
              </MobileNavItem>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, onClick, children }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-300 hover:bg-[#03303f] hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
    >
      {children}
    </Link>
  </li>
);

const MobileNavItem = ({ to, onClick, children }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-300 hover:bg-[#03303f] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  </li>
);

export default Navbar;

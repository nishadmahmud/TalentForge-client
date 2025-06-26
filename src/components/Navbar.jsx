import { Link, useLocation } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { AnimatePresence } from "framer-motion";

import {
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaTachometerAlt,
  FaPlus,
  FaList,
} from "react-icons/fa";
import { useDarkMode } from "../context/DarkModeContext";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  // Always visible links
  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/browse-tasks", label: "Browse Tasks" },
  ];

  return (
    <nav
      className={`backdrop-blur-md shadow-sm sticky top-0 z-50 border-b ${
        isDarkMode
          ? "bg-slate-900/90 border-slate-700"
          : "bg-white/90 border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight"
            >
              TalentForge
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {baseLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  location.pathname === link.to
                    ? isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-600"
                    : isDarkMode
                    ? "text-slate-200 hover:text-emerald-400"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
            {/* About Us and Contact Us always visible */}
            {[
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact Us" },
              { to: "/faq", label: "FAQ" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  location.pathname === link.to
                    ? isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-600"
                    : isDarkMode
                    ? "text-slate-200 hover:text-emerald-400"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User/Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg focus:outline-none w-20"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm">
                      {user && user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                          <FaUser className="text-emerald-600" />
                        </div>
                      )}
                    </div>
                    <FaChevronDown className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-600'} ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-50">
                        <div className={`py-1 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                          <Link
                            to="/profile"
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDarkMode 
                                ? 'text-slate-200 hover:bg-slate-700' 
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            <FaTachometerAlt className="text-emerald-500" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            to="/add-task"
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDarkMode 
                                ? 'text-slate-200 hover:bg-slate-700' 
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            <FaPlus className="text-emerald-500" />
                            <span>Add Task</span>
                          </Link>
                          <Link
                            to="/my-tasks"
                            className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                              isDarkMode 
                                ? 'text-slate-200 hover:bg-slate-700' 
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            <FaList className="text-emerald-500" />
                            <span>My Tasks</span>
                          </Link>
                          <hr className={`my-1 ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`} />
                          <button
                            onClick={() => {
                              handleLogOut();
                              setDropdownOpen(false);
                            }}
                            className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors ${
                              isDarkMode 
                                ? 'text-red-400 hover:bg-slate-700' 
                                : 'text-red-600 hover:bg-slate-50'
                            }`}
                          >
                            <FaSignOutAlt />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition-all"
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Modern Switch-Style Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              type="button"
              className={`w-10 h-6 flex items-center rounded-full border-2 transition-colors duration-300 relative ${
                isDarkMode
                  ? "bg-slate-800 border-emerald-400"
                  : "bg-white border-slate-200"
              }`}
            >
              <span
                className={`w-5 h-5 flex items-center justify-center rounded-full shadow absolute top-0 transition-all duration-300 ${
                  isDarkMode
                    ? "translate-x-4 bg-slate-900"
                    : "translate-x-0 bg-yellow-400"
                }`}
                style={{ left: 0 }}
              >
                {isDarkMode ? (
                  <FaMoon className="text-white text-sm transition-all duration-300" />
                ) : (
                  <FaSun className="text-yellow-600 text-sm transition-all duration-300" />
                )}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              className={`md:hidden ml-2 p-2 rounded-md focus:outline-none transition-colors ${
                isDarkMode ? "hover:bg-slate-800" : "hover:bg-slate-100"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FaTimes
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                />
              ) : (
                <FaBars
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <div
            className={`md:hidden overflow-hidden shadow-lg ${
              isDarkMode ? "bg-slate-900" : "bg-white"
            }`}
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {baseLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? isDarkMode
                        ? "bg-emerald-900 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                      : isDarkMode
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link
                    to="/profile"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === "/profile"
                        ? isDarkMode
                          ? "bg-emerald-900 text-emerald-400"
                          : "bg-emerald-50 text-emerald-600"
                        : isDarkMode
                        ? "text-slate-200 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/add-task"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === "/add-task"
                        ? isDarkMode
                          ? "bg-emerald-900 text-emerald-400"
                          : "bg-emerald-50 text-emerald-600"
                        : isDarkMode
                        ? "text-slate-200 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Task
                  </Link>
                  <Link
                    to="/my-tasks"
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === "/my-tasks"
                        ? isDarkMode
                          ? "bg-emerald-900 text-emerald-400"
                          : "bg-emerald-50 text-emerald-600"
                        : isDarkMode
                        ? "text-slate-200 hover:bg-slate-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    My Tasks
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isDarkMode
                        ? "text-red-400 hover:bg-slate-800"
                        : "text-red-600 hover:bg-slate-50"
                    }`}
                  >
                    Sign Out
                  </button>
                </>
              )}
              {/* About Us and Contact Us always at the end */}
              {[
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? isDarkMode
                        ? "bg-emerald-900 text-emerald-400"
                        : "bg-emerald-50 text-emerald-600"
                      : isDarkMode
                      ? "text-slate-200 hover:bg-slate-800"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

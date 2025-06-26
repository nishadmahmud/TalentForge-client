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
  FaHome,
  FaSearch,
  FaInfoCircle,
  FaEnvelope,
  FaQuestionCircle,
  FaSignInAlt,
  FaUserPlus,
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
    { to: "/", label: "Home", icon: FaHome },
    { to: "/browse-tasks", label: "Browse Tasks", icon: FaSearch },
  ];

  // Info links
  const infoLinks = [
    { to: "/about", label: "About Us", icon: FaInfoCircle },
    { to: "/contact", label: "Contact Us", icon: FaEnvelope },
    { to: "/faq", label: "FAQ", icon: FaQuestionCircle },
  ];

  // User links
  const userLinks = [
    { to: "/profile", label: "Dashboard", icon: FaTachometerAlt },
    { to: "/add-task", label: "Add Task", icon: FaPlus },
    { to: "/my-tasks", label: "My Tasks", icon: FaList },
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
            {infoLinks.map((link) => (
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
              <div className="hidden md:flex items-center space-x-3">
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
                          {userLinks.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                                isDarkMode 
                                  ? 'text-slate-200 hover:bg-slate-700' 
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                              onClick={() => setDropdownOpen(false)}
                            >
                              <link.icon className="text-emerald-500" />
                              <span>{link.label}</span>
                            </Link>
                          ))}
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
            className={`md:hidden overflow-hidden shadow-lg border-t ${
              isDarkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
            }`}
          >
            <div className="px-4 py-6 space-y-6">
              {/* User Profile Section (if logged in) */}
              {user && (
                <div className={`p-4 rounded-lg border ${
                  isDarkMode ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                }`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm">
                      {user && user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                          <FaUser className="text-emerald-600 text-lg" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        isDarkMode ? "text-slate-200" : "text-slate-900"
                      }`}>
                        {user.displayName || "User"}
                      </p>
                      <p className={`text-sm ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Navigation */}
              <div className="space-y-1">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Navigation
                </h3>
                {baseLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === link.to
                        ? isDarkMode
                          ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : isDarkMode
                        ? "text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <link.icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* User Actions (if logged in) */}
              {user && (
                <div className="space-y-1">
                  <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>
                    My Account
                  </h3>
                  {userLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        location.pathname === link.to
                          ? isDarkMode
                            ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : isDarkMode
                          ? "text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
                          : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <link.icon className="text-lg" />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogOut();
                      setMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium w-full text-left transition-all duration-200 ${
                      isDarkMode
                        ? "text-red-400 hover:bg-slate-800 hover:text-red-300"
                        : "text-red-600 hover:bg-slate-50 hover:text-red-700"
                    }`}
                  >
                    <FaSignOutAlt className="text-lg" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}

              {/* Info Links */}
              <div className="space-y-1">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  Information
                </h3>
                {infoLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      location.pathname === link.to
                        ? isDarkMode
                          ? "bg-emerald-900/50 text-emerald-400 border border-emerald-700"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : isDarkMode
                        ? "text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <link.icon className="text-lg" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>

              {/* Authentication (if not logged in) */}
              {!user && (
                <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Link
                    to="/login"
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isDarkMode
                        ? "text-emerald-400 hover:text-emerald-300 border border-emerald-600 hover:bg-emerald-900/20"
                        : "text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:bg-emerald-50"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-lg" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-sm transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserPlus className="text-lg" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

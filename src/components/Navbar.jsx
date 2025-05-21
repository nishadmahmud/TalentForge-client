import { Link, useLocation } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/browse-tasks", label: "Browse Tasks" },
    { to: "/add-task", label: "Add Task" },
    { to: "/my-tasks", label: "My Tasks" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight"
            >
              TalentForge
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                  ${
                    location.pathname === link.to
                      ? "text-emerald-600"
                      : "text-slate-700 hover:text-emerald-600"
                  }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User/Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">

                <Link to="/profile" className="focus:outline-none">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm hover:border-emerald-200 transition-colors">
                    {user && user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                        <FaUser className="text-emerald-600" />
                      </div>
                    )}
                  </div>
                </Link>

                <button
                  onClick={handleLogOut}
                  className="hidden md:flex items-center space-x-1 px-3 py-1 text-sm font-medium text-slate-700 hover:text-red-600 transition-colors"
                  title="Sign out"
                >
                  <FaSignOutAlt className="text-base" />
                  <span>Sign out</span>
                </button>
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

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-2 p-2 rounded-md hover:bg-slate-100 focus:outline-none transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <FaTimes className="h-5 w-5 text-slate-700" />
              ) : (
                <FaBars className="h-5 w-5 text-slate-700" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white shadow-lg"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${
                      location.pathname === link.to
                        ? "bg-emerald-50 text-emerald-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogOut();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 text-center text-base font-medium text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2 mt-2 text-center text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-md shadow-sm transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

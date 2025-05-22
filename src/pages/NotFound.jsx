import React from "react";
import { Link } from "react-router";
import { useDarkMode } from '../context/DarkModeContext';

const NotFound = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-slate-50 to-emerald-100 text-slate-900'}`}>
      <div className={`rounded-2xl shadow-xl border p-10 flex flex-col items-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h1 className={`text-6xl font-extrabold mb-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>404</h1>
        <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Page Not Found</h2>
        <p className={`mb-6 text-center max-w-md ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors text-lg shadow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10 flex flex-col items-center">
        <h1 className="text-6xl font-extrabold text-emerald-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
        <p className="text-slate-500 mb-6 text-center max-w-md">
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

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-center px-6">
      <h1 className="text-8xl font-bold text-cyan-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-lg font-medium text-white bg-cyan-500 rounded-lg shadow hover:bg-cyan-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

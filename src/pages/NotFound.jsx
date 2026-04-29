import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center m-10 p-10">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-primary">404</h1>

        <h2 className="text-2xl font-semibold mt-4">Page not found</h2>

        <p className="text-gray-400 mt-2">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link to="/" className="btn btn-outline">
            Go Home
          </Link>

          <Link to="/login" className="btn btn-outline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

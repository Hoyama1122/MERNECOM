import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

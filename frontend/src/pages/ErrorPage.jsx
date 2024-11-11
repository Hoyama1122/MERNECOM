// src/pages/ErrorPage.js
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl mb-8">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="text-emerald-400 hover:text-emerald-500 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;

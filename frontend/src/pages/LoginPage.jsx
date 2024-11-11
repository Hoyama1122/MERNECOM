import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, ArrowRight, Mail, Lock, Loader } from "lucide-react";
import InputForm from "../components/InputForm";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { login, loading } = useUserStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center text-emerald-400">
          Login to your account
        </h1>
      </motion.div>
      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <InputForm
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              icon={Mail}
            />
            <InputForm
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              icon={Lock}
            />
            <button
              type="submit"
              className="mt-8 w-full flex justify-center items-center py-2  px-4 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin mr-2" size={20} />
              ) : (
                <>
                  <LogIn className="mr-2" size={20} />
                  Login
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signin"
              className="text-emerald-400 font-medium hover:text-emerald-500 transition duration-300 ease-in-out"
            >
              Sign up here <ArrowRight className="inline " size={16} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

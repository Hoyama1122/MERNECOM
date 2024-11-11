import { useState } from "react";
import { User, Mail, Lock, Loader, UserPlus, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import InputForm from "../components/InputForm"; // Import the InputForm component
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
const SignInPages = () => {
  const navigate = useNavigate();
  const { signup, loading } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await signup(formData);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Sign in to your account
        </h2>
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
              id="name"
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              icon={User}
            />
            <InputForm
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              icon={Mail}
            />
            <InputForm
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              icon={Lock}
            />
            <InputForm
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              icon={Lock}
            />
            <button
              type="submit"
              className=" mt-8 w-full flex justify-center items-center py-2  px-4 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2" size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 font-medium hover:text-emerald-500 transition duration-300 ease-in-out"
            >
              Login here <ArrowRight className="inline " size={16} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPages;

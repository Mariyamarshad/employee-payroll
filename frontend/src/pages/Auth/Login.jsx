import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
 

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white/90 backdrop-blur-md px-8 md:px-12 rounded-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl mb-6 md:mb-0">
      
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600 mb-6">
           Log in to track and manage your employees
          </p>

          <form className="space-y-4">
           

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none"
              />
            </div>

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className=" text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white font-semibold py-3 rounded-lg shadow-lg hover:scale-[1.02] transition"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center rounded-3xl md:rounded-r-3xl md:rounded-l-none shadow-2xl overflow-hidden">
        <img
          src="/login.jpg"
          alt="Sign Up Illustration"
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;

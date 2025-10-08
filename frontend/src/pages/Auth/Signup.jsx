import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { resetSignupSuccess, signupUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, signupSuccess } = useSelector((state) => state.auth);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signupUser(data));
  };

  useEffect(() => {
    if (signupSuccess) {
      toast.success("Signup Successfull!");
      setTimeout(() => {
        navigate("/login");
        dispatch(resetSignupSuccess());
      }, 1500);
    }
  }, [signupSuccess, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      if (error.toLowerCase().includes("email")) {
        toast.error("Email already Exists. Please use a different one!");
      } else {
        toast.error(error);
      }
    }
  }, [error]);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white/90 backdrop-blur-md px-8 md:px-12 rounded-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl mb-6 md:mb-0">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2 text-center">
            Sign Up
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Secure your communications with{" "}
            <span className="text-teal-800 font-semibold">TalentTrack</span>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent outline-none"
                value={data.name}
                onChange={handleOnChange}
                name="name"
                required
              />
            </div>

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none"
                value={data.email}
                onChange={handleOnChange}
                name="email"
                required
              />
            </div>

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full bg-transparent outline-none"
                name="password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className=" text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={data.confirmPassword}
                className="w-full bg-transparent outline-none"
                onChange={handleOnChange}
                name="confirmPassword"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className=" text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-900 text-white font-semibold py-3 rounded-lg shadow-lg transition 
             ${
               loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
             }`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span>Signing up...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-teal-800 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-700 text-white p-10 shadow-2xl">

        <div className="max-w-md text-center md:text-left">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join TalentTrack and Simplify Your Payroll Journey
            </h2>

          <p className="text-gray-200 mb-8 leading-relaxed">
            “Experience effortless payroll and employee management. From
            onboarding to payments — TalentTrack keeps everything accurate,
            automated, and in one place.”
          </p>
        </div>

        <div className="border-t border-gray-400 pt-6 mt-6">
          <p className="uppercase text-sm text-gray-300 tracking-widest">
            Trusted by 500+ growing businesses worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

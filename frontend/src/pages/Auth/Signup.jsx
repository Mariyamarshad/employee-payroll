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
        toast.error("Email already Exists. Please use a different one!")
      } else {
        toast.error(error)
      }
    }
  }, [error])

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

          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-2 text-center">
            Sign Up
          </h2>

          <p className="text-gray-600 mb-6 text-center">
            Secure your communications with{" "}
            <span className="text-blue-600 font-semibold">TalentTrack</span>
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
              className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white font-semibold py-3 rounded-lg shadow-lg transition 
             ${loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"}`}
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
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center rounded-3xl md:rounded-r-3xl md:rounded-l-none shadow-2xl overflow-hidden">
        <img
          src="/singup.jpg"
          alt="Sign Up Illustration"
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;

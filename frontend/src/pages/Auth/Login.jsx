import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const { loading, error, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (user) {
      toast.success("Login successful ");

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/employee/dashboard");
        }
      }, 1500);
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white/90 backdrop-blur-md px-8 md:px-12 rounded-3xl md:rounded-l-3xl md:rounded-r-none shadow-2xl mb-6 md:mb-0">
        <div className="w-full max-w-md">
          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-700 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600 mb-6">
            Log in to stay on top of your goals and achievements.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center border-b border-gray-500   px-3 py-2 focus-within:border-b-2 focus-within:border-blue-400 outline-none">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-600 to-teal-950 text-white font-semibold py-3 rounded-lg shadow-lg transition 
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
                  <span>Loging in...</span>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-teal-800 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-teal-900 to-teal-700 text-white p-10 shadow-2xl">
        <div className="max-w-md text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simplify Tasks with Intelligent Automation{" "}
          </h2>

          <p className="text-gray-200 mb-8 leading-relaxed">
            “Our operations are smoother than ever. TalentTrack helps us focus
            on people, not paperwork.”
          </p>
        </div>

        <div className="border-t border-gray-500 pt-6 mt-6">
          <p className="uppercase text-sm tracking-widest text-gray-300 mb-4">
            Trusted by 500+ growing businesses worldwide{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

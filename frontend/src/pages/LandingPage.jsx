import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">

      <section className="flex flex-col items-center text-center px-8 md:px-16 max-w-3xl mt-10">
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6"
        >
          Empowering Businesses with{" "}
          <span className="text-teal-700">Smart Talent Management</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-600 text-lg leading-relaxed mb-10"
        >
          At <span className="font-semibold text-teal-700">TalentTrack</span>, we help
          organizations streamline their entire workforce — from hiring to payroll —
          with intelligent automation, transparency, and innovation.
        </motion.p>

         <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-gray-500 italic mb-10"
        >
          “Because great companies are built by empowered people.”
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogin}
          className="bg-teal-700 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-teal-800 transition-all duration-300 shadow-md"
        >
          Login To Get Started
        </motion.button>
      </section>

      <footer className="text-gray-500 text-sm py-6">
        © {new Date().getFullYear()} TalentTrack — All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;

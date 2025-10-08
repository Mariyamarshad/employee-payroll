import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-50 px-10 py-10">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Welcome in, <span className="text-black">TalentTrack</span>
      </h1>

      {/* Row: Progress Section (Left) + Stats (Right) */}
      <div className="flex justify-between items-center">
        {/* LEFT — Progress Section */}
        <div className="flex items-center space-x-8">
          {/* Interviews */}
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm mb-1">Interviews</p>
            <div className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium">
              15%
            </div>
          </div>

          {/* Hired */}
          <div className="flex flex-col items-center">
            <p className="text-gray-600 text-sm mb-1">Hired</p>
            <div className="bg-yellow-300 text-black px-6 py-2 rounded-full text-sm font-medium">
              15%
            </div>
          </div>
         
        </div>

        {/* RIGHT — Stats Section */}
        <div className="flex space-x-16">
          {/* Employees */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-gray-900">78</p>
            <p className="text-gray-500 text-sm mt-1">Employee</p>
          </div>

          {/* Hirings */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-gray-900">56</p>
            <p className="text-gray-500 text-sm mt-1">Hirings</p>
          </div>

          {/* Projects */}
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-gray-900">203</p>
            <p className="text-gray-500 text-sm mt-1">Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

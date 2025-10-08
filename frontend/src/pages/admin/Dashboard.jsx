import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Welcome to <span className="text-black">TalentTrack</span>
      </h1>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-6 mb-10">
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-sm mb-1">Interviews</p>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                15%
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 text-sm mb-1">Hired</p>
              <div className="bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-medium">
                15%
              </div>
            </div>
          </div>
        </div>

        {/* Right Stats */}
        <div className="flex space-x-16">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-gray-900">78</p>
            <p className="text-gray-500 text-sm mt-1">Employees</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-semibold text-gray-900">56</p>
            <p className="text-gray-500 text-sm mt-1">Hirings</p>
          </div>
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

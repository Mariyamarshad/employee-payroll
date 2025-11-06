import React from "react";
import { useSelector } from "react-redux";
import { FaClock, FaMoneyBillWave, FaCalendarCheck, FaChartLine } from "react-icons/fa";

const EmpDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">
      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Welcome, {user ? user.name : "Employee"} 
      </h1>
      <p className="text-gray-600 mb-10">
        Here’s an overview of your work details and updates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Days Present" value="22 / 26" icon={<FaCalendarCheck />} />
        <StatCard title="Next Salary Date" value="30 Oct 2025" icon={<FaMoneyBillWave />} />
        <StatCard title="Average Hours" value="8h 12m" icon={<FaClock />} />
        <StatCard title="Performance" value="Excellent" icon={<FaChartLine />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 max-w-4xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Company Announcements
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>🎉 Annual Meetup on Oct 15, 2025</li>
          <li>💰 Payroll starts on Oct 25, 2025</li>
          <li>💼 Performance reviews begin in November</li>
        </ul>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white shadow-sm rounded-xl p-5 flex items-center space-x-4 border border-gray-100">
    <div className="text-teal-600 text-2xl">{icon}</div>
    <div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

export default EmpDashboard;

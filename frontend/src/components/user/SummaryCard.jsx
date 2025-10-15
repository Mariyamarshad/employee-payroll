import React from "react";

const SummaryCard = ({ title, value, icon, color }) => {
  const colorMap = {
    teal: "text-teal-600 bg-teal-100",
    red: "text-red-600 bg-red-100",
    orange: "text-orange-600 bg-orange-100",
    blue: "text-blue-600 bg-blue-100",
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className={`p-3 rounded-full ${colorMap[color]} text-lg`}>{icon}</div>
      <div className="text-right">
        <p className="text-gray-600 text-sm">{title}</p>
        <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;

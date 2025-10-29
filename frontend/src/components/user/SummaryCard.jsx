import React from "react";

const SummaryCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    teal: "text-teal-600 bg-teal-50",
    red: "text-rose-600 bg-rose-50",
    orange: "text-orange-600 bg-orange-50",
    blue: "text-blue-600 bg-blue-50",
  };

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl shadow-sm border border-gray-100 bg-white hover:shadow-md transition duration-150 ${colorClasses[color]}`}
    >
      <div className={`text-2xl ${colorClasses[color].split(" ")[0]}`}>{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;

import React from "react";
import { FaCalendarCheck, FaClock } from "react-icons/fa";
import SummaryCard from "./SummaryCard";

const SummaryPanel = () => (
  <div className="lg:w-1/3  rounded-3xl p-8 border border-white/40">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Summary</h2>

    <div className="space-y-5">
      <SummaryCard title="Days Present" value="22" icon={<FaCalendarCheck />} color="teal" />
      <SummaryCard title="Days Absent" value="4" icon={<FaClock />} color="red" />
      <SummaryCard title="Late Arrivals" value="2" icon={<FaClock />} color="orange" />
      <SummaryCard title="Average Hours" value="8h 10m" icon={<FaClock />} color="blue" />
    </div>

    <div className="mt-10 text-sm text-gray-600">
      <p>Last Updated: <span className="font-medium">Oct 14, 2025</span></p>
    </div>
  </div>
);

export default SummaryPanel;

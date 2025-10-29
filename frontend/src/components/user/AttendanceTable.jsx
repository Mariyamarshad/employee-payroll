import React from "react";
import { FaCalendarDay, FaClock, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const AttendanceTable = ({ attendance = [] }) => {
  const getDayInfo = (dateString) => {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const isWeekend = dayIndex === 0 || dayIndex === 6;
    return { dayName: dayNames[dayIndex], isWeekend };
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-white flex items-center gap-2">
        <FaCalendarDay className="text-teal-600 text-lg" />
        <h2 className="text-lg font-bold text-gray-800">Recent Attendance</h2>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
          <tr>
            <th className="py-3 px-5 text-left">Date</th>
            <th className="py-3 px-5 text-left">Check-In</th>
            <th className="py-3 px-5 text-left">Check-Out</th>
            <th className="py-3 px-5 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((item, i) => {
            const { dayName, isWeekend } = getDayInfo(item.date);
            return (
              <tr key={i} className={`border-b border-gray-100 ${isWeekend ? "text-rose-600" : ""}`}>
                <td className="py-3 px-5 font-medium">
                  {item.date} <span className="text-xs text-gray-500">({dayName})</span>
                </td>
                <td className="py-3 px-5">
                  {item.checkInTime ? new Date(item.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}
                </td>
                <td className="py-3 px-5">
                  {item.checkOutTime ? new Date(item.checkOutTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--"}
                </td>
                <td className={`py-3 px-5 font-semibold ${isWeekend ? "text-rose-600" : "text-teal-700"}`}>
                  {item.totalHours || "0h 0m"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;

import React from "react";

const AttendanceTable = ({ attendance }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <table className="w-full text-left text-gray-700 text-sm">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
        <tr>
          <th className="py-3 px-4">Date</th>
          <th className="py-3 px-4">Check-In</th>
          <th className="py-3 px-4">Check-Out</th>
          <th className="py-3 px-4">Total</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((item, i) => (
          <tr
            key={i}
            className="border-b border-gray-100 hover:bg-teal-50 transition"
          >
            <td className="py-3 px-4">{item.date}</td>
            <td className="py-3 px-4">
              {item.checkInTime
                ? new Date(item.checkInTime).toLocaleTimeString()
                : "--"}
            </td>
            <td className="py-3 px-4">
              {item.checkOutTime
                ? new Date(item.checkOutTime).toLocaleTimeString()
                : "--"}
            </td>
            <td className="py-3 px-4 font-medium text-teal-700">
              {item.totalHours || "--"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AttendanceTable;

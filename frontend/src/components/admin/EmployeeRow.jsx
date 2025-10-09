import React from "react";

const EmployeeRow = ({ employee }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="flex items-center gap-3 py-3 px-4">
        <img
          src={
            employee.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={employee.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium text-gray-800">{employee.name}</span>
      </td>
      <td className="px-4">{employee.email}</td>
      <td className="px-4">
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          {employee.department || "—"}
        </span>
      </td>
      <td className="px-4">{employee.designation || "—"}</td>
      <td className="px-4">{employee.salary || "—"}</td>
      <td className="px-4">
        <button className="text-teal-600 font-medium hover:underline">
          See Details
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;

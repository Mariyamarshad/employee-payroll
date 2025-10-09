import React, { useEffect } from "react";
import EmployeeRow from "./EmployeeRow";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../redux/slices/employeeSlice";

const EmployeeTable = () => {
  const dispatch = useDispatch();

  const { employees, loading, error, message } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-lg m-4">
      <table className="min-w-full text-center text-sm text-gray-700">
        <thead className="border-b bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3">Designation</th>
            <th className="px-4 py-3">Salary</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="py-4 text-gray-500">
                Loading employees...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="py-4 text-red-500">
                {message || "Failed to load employees"}
              </td>
            </tr>
          ) : employees?.length > 0 ? (
            employees.map((emp, i) => (
              <EmployeeRow key={emp._id || i} employee={emp} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

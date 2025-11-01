import React, { useEffect } from "react";
import moment from "moment";
import { FaCalendarDay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAttendance } from "../../redux/slices/attendanceSlice";

const AttendanceTable = ({ employeeId, joiningDate }) => {
  const dispatch = useDispatch();

  const { records, loading } = useSelector((state) => ({
    records: state.attendance.records,
    loading: state.attendance.loading,
  }));

  useEffect(() => {
    if (employeeId) dispatch(fetchAllAttendance(employeeId));
  }, [dispatch, employeeId]);

  const getDayInfo = (date) => {
    const dayName = moment(date).format("ddd");
    const isWeekend = [0, 6].includes(moment(date).day());
    return { dayName, isWeekend };
  };

  const formatHours = (hours) => {
    if (!hours) return "0h 0m";
    if (typeof hours === "string") return hours;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const filteredRecords = joiningDate
    ? records.filter((r) =>
        moment(r.date).isSameOrAfter(moment(joiningDate), "day")
      )
    : records;

  const sortedRecords = [...filteredRecords].sort(
    (a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()
  );

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-white flex items-center gap-2">
        <FaCalendarDay className="text-teal-600 text-lg" />
        <h2 className="text-lg font-bold text-gray-800">Recent Attendance</h2>
      </div>

      {loading ? (
        <p className="text-center py-6 text-gray-500">Loading attendance...</p>
      ) : sortedRecords.length === 0 ? (
        <p className="text-center py-6 text-gray-500">
          No attendance data found
        </p>
      ) : (
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="py-3 px-5 text-left">Date</th>
              <th className="py-3 px-5 text-left">Check-In</th>
              <th className="py-3 px-5 text-left">Check-Out</th>
              <th className="py-3 px-5 text-left">Total</th>
              <th className="py-3 px-5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedRecords.map((item, i) => {
              const { dayName, isWeekend } = getDayInfo(item.date);
              const isAbsent = item.status === "Absent";

              return (
                <tr
                  key={i}
                  className={`border-b border-gray-100 ${
                    isWeekend ? "bg-rose-50 text-rose-600" : ""
                  } ${isAbsent ? "bg-red-50" : ""}`}
                >
                  <td className="py-3 px-5 font-medium">
                    {moment(item.date).format("DD MMM YYYY")}{" "}
                    <span className="text-xs text-gray-500">({dayName})</span>
                  </td>
                  <td className="py-3 px-5">{item.checkIn || "--"}</td>
                  <td className="py-3 px-5">{item.checkOut || "--"}</td>
                  <td
                    className={`py-3 px-5 font-semibold ${
                      isWeekend
                        ? "text-rose-600"
                        : isAbsent
                        ? "text-red-600"
                        : "text-teal-700"
                    }`}
                  >
                    {item.checkIn && !item.checkOut
                      ? "--"
                      : item.totalDisplay || formatHours(item.totalHours)}
                  </td>

                  <td className="py-3 px-5">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Late"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "Half Day"
                          ? "bg-orange-100 text-orange-700"
                          : item.status === "Overtime"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status || "—"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceTable;

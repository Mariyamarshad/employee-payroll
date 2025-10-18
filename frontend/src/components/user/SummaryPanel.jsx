import React, { useEffect, useState } from "react";
import { FaCalendarCheck, FaTimesCircle, FaClock, FaStopwatch } from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import { fetchAttendanceSummary } from "../../redux/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux"

const SummaryPanel = ({ userId }) => {
  const dispatch = useDispatch()
  const { summary, summaryLoading } = useSelector((state) => state.attendance)

  useEffect(() => {
    if (userId) {
      dispatch(fetchAttendanceSummary(userId))
    }
  }, [dispatch, userId])


  if (summaryLoading) {
    return (
      <div className="lg:w-1/3 rounded-3xl p-8 border border-gray-200 shadow-md bg-white">
        <p className="text-gray-500 text-center animate-pulse">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="lg:w-1/3 rounded-3xl p-8  ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Attendance Summary
      </h2>

      <div className="space-y-5">
        <SummaryCard
          title="Days Present"
          value={summary?.daysPresent ?? 0}
          icon={<FaCalendarCheck />}
          color="teal"
        />
        <SummaryCard
          title="Days Absent"
          value={summary?.daysAbsent ?? 0}
          icon={<FaTimesCircle />}
          color="red"
        />
        <SummaryCard
          title="Late Arrivals"
          value={summary?.lateArrivals ?? 0}
          icon={<FaClock />}
          color="orange"
        />
        <SummaryCard
          title="Overtime"
          value={summary?.overtime ?? "0h 0m"}
          icon={<FaStopwatch />}
          color="blue"
        />
      </div>

      <div className="mt-10 text-sm text-gray-600 text-center border-t pt-4">
        <p>
          Last Updated:{" "}
          <span className="font-medium text-gray-800">
            {new Date().toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SummaryPanel;

import React, { useEffect } from "react";
import {
  FaCalendarCheck,
  FaTimesCircle,
  FaClock,
  FaStopwatch,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";
import { fetchSummary } from "../../redux/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";

const SummaryPanel = ({ userId }) => {
  const dispatch = useDispatch();
  const { summary, loading } = useSelector((state) => state.attendance);

  useEffect(() => {
    if (userId) dispatch(fetchSummary(userId));
  }, [dispatch, userId]);

  if (loading || !summary) {
    return (
      <div className="lg:w-1/3 rounded-3xl p-8 border border-gray-200 shadow-md bg-white">
        <p className="text-gray-500 text-center animate-pulse">
          Loading summary...
        </p>
      </div>
    );
  }

  return (
    <div className="lg:w-1/3 rounded-3xl p-8 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        Attendance Summary
      </h2>

      <div className="space-y-5">
        <SummaryCard
          title="Days Present"
          value={summary?.totalDaysPresent ?? 0}
          icon={<FaCalendarCheck />}
          color="teal"
        />
        <SummaryCard
          title="Days Absent"
          value={summary?.totalDaysAbsent ?? 0}
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
          value={`${summary?.overtimeHours ?? 0}h`}
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttendanceButton from "../../components/user/AttendanceButton";
import AttendanceTable from "../../components/user/AttendanceTable";
import {
  fetchUserAttendance,
  checkIn,
  checkOut,
} from "../../redux/slices/attendanceSlice";
import SummaryPanel from "../../components/user/SummaryPanel";

const Attendance = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const { records, isCheckedIn } = useSelector((state) => state.attendance);
  const userId = user?._id;

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserAttendance(user?._id));
    }
  }, [dispatch, user?._id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">
          Loading user data...
        </h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">
          Please log in to view attendance.
        </h2>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">
          Please log in to view attendance.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-50 p-10 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 rounded-3xl p-10 flex flex-col items-center justify-center border border-white/40">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Attendance Tracker
        </h1>
        <p className="text-gray-600 mb-8">{new Date().toDateString()}</p>

        {isCheckedIn === null ? (
          <button
            disabled
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg"
          >
            Loading status...
          </button>
        ) : (
          <AttendanceButton
            isCheckedIn={isCheckedIn}
            onCheckIn={() => dispatch(checkIn(user?._id))}
            onCheckOut={() => dispatch(checkOut(user?._id))}
          />
        )}

        <div className="mt-12 w-full max-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Attendance
          </h2>
          <AttendanceTable attendance={records} />
        </div>
      </div>

      <SummaryPanel userId={user?._id} />
    </div>
  );
};

export default Attendance;

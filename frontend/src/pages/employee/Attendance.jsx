import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckIn, handleCheckOut, fetchAllAttendance, fetchTodayAttendance, fetchSummary } from "../../redux/slices/attendanceSlice";
import AttendanceTable from "../../components/user/AttendanceTable";
import SummaryPanel from "../../components/user/SummaryPanel";
import AttendanceButton from "../../components/user/AttendanceButton";

const AttendancePage = () => {
  const dispatch = useDispatch();
  const { isCheckedIn, records } = useSelector((state) => state.attendance);

  const user = useSelector((state) => state.auth?.user)
  const userId = user?._id; 

  useEffect(() => {
  if (userId) {
   dispatch(fetchTodayAttendance(user._id));
    dispatch(fetchAllAttendance(user._id));
    dispatch(fetchSummary(user._id));
  }
}, [dispatch, userId]);


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-50 p-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-1 rounded-3xl p-10 border border-white/40 bg-white/80 backdrop-blur-sm shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Attendance Tracker
        </h1>
        <p className="text-gray-600 mb-8">{new Date().toDateString()}</p>

        <div className="flex justify-center mb-12">
          <AttendanceButton
            isCheckedIn={isCheckedIn}
            onCheckIn={() => dispatch(handleCheckIn(userId))}
            onCheckOut={() => dispatch(handleCheckOut(userId))}
            disabled={!userId}
          />
        </div>

        <AttendanceTable attendance={records || []} />
      </div>

      <SummaryPanel userId={userId} />
    </div>
  );
};

export default AttendancePage;

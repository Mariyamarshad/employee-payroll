import React from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const AttendanceButton = ({ isCheckedIn, onCheckIn, onCheckOut }) => (
  <button
    onClick={isCheckedIn ? onCheckOut : onCheckIn}
    className={`w-48 h-48 rounded-full flex flex-col justify-center items-center text-white text-xl font-semibold shadow-xl transform transition-all duration-300 active:scale-95 ${
      isCheckedIn
        ? "bg-red-500 hover:bg-red-600"
        : "bg-teal-600 hover:bg-teal-700"
    }`}
  >
    {isCheckedIn ? (
      <>
        <FaSignOutAlt className="text-4xl mb-2" />
        Check Out
      </>
    ) : (
      <>
        <FaSignInAlt className="text-4xl mb-2" />
        Check In
      </>
    )}
  </button>
);

export default AttendanceButton;

import axios from "axios";
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendDomain}/attendance`;

export const checkIn = async (employeeId) => {
  try {
    const res = await axios.post(
      `${API_URL}/checkin`,
      { employeeId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
        return error.response?.data || { message: "Unable to check-in" };

  }
};

export const checkOut = async (employeeId) => {
  try {
    const res = await axios.post(
      `${API_URL}/checkout`,
      { employeeId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Check-out API Error:", error);
    return { success: false, message: "Check-out failed" };
  }
};

export const getTodayAttendance = async (employeeId) => {
  try {
    const res = await axios.get(`${API_URL}/${employeeId}/today`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Get Today Attendance Error:", error);
    return { success: false, data: null };
  }
};

export const getAttendanceSummary = async (employeeId) => {
  try {
    const res = await axios.get(`${API_URL}/summary/${employeeId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Summary API error:", error);
    return null;
  }
};

export const getAllAttendance = async (employeeId) => {
  try {
    const res = await axios.get(`${API_URL}/${employeeId}/all`, {
      withCredentials: true,
    });
    return res.data.attendance;
  } catch (error) {
    console.error("All Attendance API Error:", error);
    return [];
  }
};

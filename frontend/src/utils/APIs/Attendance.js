import axios from "axios";
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendDomain}/attendance`;

export const checkIn = async (userId) => {
    const res = await axios.post(
        `${API_URL}/checkin`,
        {userId},
        { withCredentials: true}
    )
    return res.data;
}

export const checkOut = async (userId) => {
    const res = await axios.post(
        `${API_URL}/checkout`,
        {userId},
        {withCredentials: true }
    )
    return res.data
}

 export const getAllAttendance = async () => {
  const res = await axios.get(`${API_URL}/all`, { withCredentials: true });
  return res.data;
};


export const getUserAttendance = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`, { withCredentials: true });
  return res.data;
};

export const getTodayAttendance = async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}/today`, { withCredentials: true });
  return res.data;
};

export const getAttendanceSummary = async (userId) => {
  const res = await axios.get(`${API_URL}/summary/${userId}`, { withCredentials: true })
  return res.data
}

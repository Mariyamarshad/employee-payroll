import axios from "axios";
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendDomain}/attendance`;

export const checkIn = async () => {
    const res = await axios.post(
        `${API_URL}/checkin`,
        {},
        { withCredentials: true}
    )
    return res.data;
}

export const checkOut = async () => {
    const res = await axios.post(
        `${API_URL}/checkout`,
        {},
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


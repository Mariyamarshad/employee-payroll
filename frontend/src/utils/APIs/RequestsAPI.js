import axios from "axios";
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const fetchRequests = async () => {
  const res = await axios.get(`${backendDomain}/api/requests`, { withCredentials: true });
  return res.data;
};

const fetchRequestById = async (id) => {
  const res = await axios.get(`${backendDomain}/api/requests/${id}`, { withCredentials: true });
  return res.data;
};

const createRequest = async (requestData) => {
    const res = await axios.post(`${backendDomain}/api/requests`, requestData, { withCredentials: true})
    return res.data
}

const replyRequest = async({ id, message }) => {
    const res = await axios.post(`${backendDomain}/api/requests/${id}/reply`, { message }, { withCredentials: true })
    return res.data;
}

const updateStatus = async({ id, status })=> {
    const res = await axios.patch(`${backendDomain}/api/requests/${id}/status`, { status }, { withCredentials: true})
    return res.data;
}

export default {fetchRequests, fetchRequestById, updateStatus, replyRequest, createRequest}

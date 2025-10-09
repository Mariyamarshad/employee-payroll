import axios from "axios"
const backendDomain = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendDomain}/admin/`;

const addEmployee = async (employeeData) => {
    const res = await axios.post(
        `${API_URL}add-employee`,
        employeeData,
        { withCredentials: true}
    )
    return res.data;
}

const getAllEmployees = async () => {
    const res = await axios.get(
        `${API_URL}get-employees`,
        {withCredentials: true}
    )
    return res.data;
}

export default { addEmployee, getAllEmployees };
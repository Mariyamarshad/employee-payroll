import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import EmployeeAPI from "../../utils/EmployeeAPI"

export const addEmployee = createAsyncThunk(
    "employee/addEmployee",
    async (employeeData, thunkAPI) => {
        try {
            return await EmployeeAPI.addEmployee(employeeData);
        } catch (err) {
            const message = err.response?.data?.message || err.message ||"Failed to add employee";
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getAllEmployees = createAsyncThunk(
    "employee/getAllEmployees",
    async (_, thunkAPI) => {
        try {
            return await EmployeeAPI.getAllEmployees();
        } catch (err) {
            const message = err.response?.data?.message || err.message ||"Failed to fetch employees";
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        employees: [],
        loading: false,
        success: false,
        error: false,
        message: "",
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addEmployee.pending, (state) => {
            state.loading = true;
        })
        .addCase(addEmployee.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error=false;
            state.message = action.payload.message;
            state.employees.push(action.payload.employee)
        })
        .addCase(addEmployee.rejected, (state,action) => {
            state.loading = false;
            state.error = true;
            state.message =action.payload;
        })


        .addCase(getAllEmployees.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.employees = action.payload.employees;
        })
        .addCase(getAllEmployees.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.message = action.payload;
        })
    }
})

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
import { configureStore } from '@reduxjs/toolkit'

import authReducer from "../redux/slices/authSlice"
import employeeReducer from './slices/employeeSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        employee: employeeReducer
    }
})
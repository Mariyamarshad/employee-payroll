const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser")

const AuthRouter = require("./routes/commonRoutes/AuthRoutes")
const employeeRoutes = require("./routes/adminROutes/employeeRoutes")
const attendanceRoutes = require("./routes/employeeRoutes/attendanceRoutes")

const app = express();
app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}
));
app.use(express.json())


app.use("/auth", AuthRouter);
app.use("/admin", employeeRoutes)
app.use("/attendance", attendanceRoutes)

const PORT = process.env.PORT

async function startServer() {
try {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
} catch (err) {
    console.error("Database connection failed:", err.message)
}
}

startServer();
const User = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const addEmployee = async (req, res) => {
    try {
        const { name, email, department, designation, salary } = req.body;

        const existingEmp = await User.findOne({ email })
        if(existingEmp) {
            return res.status(400).json({ success: false, message: "Employee already exists."})
        }

        const randomPassword = crypto.randomBytes(6).toString("hex")
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const newEmployee = new User({
            name, 
            email,
            password: hashedPassword,
            department,
            designation,
            salary,
            role: "employee",
        })

        await newEmployee.save();

        res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee: {
                name: newEmployee.name,
                email: newEmployee.email,
                role: newEmployee.role,
                department: newEmployee.department,
                designation: newEmployee.designation,
                salary: newEmployee.salary,
            },
            tempPassword: randomPassword,
        })

    } catch (err) {
        console.error("Add Employee error:", err)
        res.status(500).json({ success: false, message: "Server error"})
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: "employee" }).select("-password");
        res.status(200).json({ success: true, employees })
    } catch (err) {
        console.error("Error fetching employees:", err);
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

module.exports = { addEmployee, getAllEmployees}
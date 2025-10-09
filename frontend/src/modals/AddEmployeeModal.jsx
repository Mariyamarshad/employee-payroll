import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { addEmployee, reset } from "../redux/slices/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const AddEmployeeModal = ({ onClose }) => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    if (success) {
      onClose();
      dispatch(reset());
    }
    if (error) {
      toast.error(message || "Failed to add employee");
      dispatch(reset());
    }
  }, [success, error, message, dispatch, onClose]);

  const designations = {
    "Software Development": [
      "Junior Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Mobile App Developer",
      "Technical Lead",
      "Software Architect",
    ],
    "UI/UX Design": [
      "UI Designer",
      "UX Designer",
      "Product Designer",
      "Visual Designer",
      "Design Lead",
    ],
    "Quality Assurance": [
      "QA Engineer",
      "QA Analyst",
      "Automation Engineer",
      "QA Lead",
    ],
    "DevOps / Cloud Operations": [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer (SRE)",
      "System Administrator",
    ],
    "IT Support / Infrastructure": [
      "IT Support Specialist",
      "Network Administrator",
      "System Administrator",
      "Helpdesk Technician",
    ],
    "Product Management": [
      "Product Manager",
      "Associate Product Manager",
      "Product Owner",
      "Technical Product Manager",
    ],
    "Project Management": [
      "Project Coordinator",
      "Project Manager",
      "Scrum Master",
      "Program Manager",
    ],
    "Research & Development": [
      "Research Engineer",
      "Machine Learning Engineer",
      "AI Engineer",
      "Data Scientist",
      "Data Analyst",
    ],
    "HR & Administration": [
      "HR Executive",
      "HR Manager",
      "Talent Acquisition Specialist",
      "Office Administrator",
    ],
    "Finance & Accounts": [
      "Accountant",
      "Finance Manager",
      "Billing Executive",
    ],
    "Sales & Marketing": [
      "Business Development Executive",
      "Sales Manager",
      "Marketing Executive",
      "Digital Marketing Specialist",
      "SEO Analyst",
    ],
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setDesignation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      name,
      email,
      department,
      designation,
      salary,
      employmentType,
    };

    dispatch(addEmployee(newEmployee));
    toast.success("Employee added successfully!")
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4 relative transform transition-all duration-300 scale-100 hover:scale-[1.01]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <h3 className="text-2xl font-bold text-teal-700 mb-2 text-center">
          Add New Employee
        </h3>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">
              Basic Information
            </h4>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                required
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2 border-b pb-1">
              Job Details
            </h4>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={handleDepartmentChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                  required
                >
                  <option value="">Select Department</option>
                  {Object.keys(designations).map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Designation
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  disabled={!department}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition ${
                    !department ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  required
                >
                  <option value="">
                    {department
                      ? "Select Designation"
                      : "Select Department First"}
                  </option>
                  {designations[department]?.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Salary (PKR)
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Enter salary"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Employment Type
                </label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none transition"
                  required
                >
                  <option value="">Select Type</option>
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>
          </div>

          <div className="text-center pt-0">
            <button
              type="submit"
              disabled={loading}
              className={`bg-teal-700 text-white px-6 py-2.5 rounded-lg shadow hover:bg-teal-800 transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;

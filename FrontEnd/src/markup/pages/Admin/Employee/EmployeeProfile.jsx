import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../Context/AuthContext";
import Avatar from "react-avatar";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import employeeService from "../../../../services/employee.service";
import "./EmployeeProfile.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee } = useAuth();
  console.log(employee);

  const [employeeDetails, setEmployeeDetails] = useState({});
  const [performanceData, setPerformanceData] = useState({
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Performance",
        backgroundColor: "#FBA617",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [65, 59, 80, 81],
      },
    ],
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await employeeService.singleEmployee(
          employee.employee_token,
          id
        );
        if (
          response &&
          response.singleEmployee &&
          response.singleEmployee.length > 0
        ) {
          // If the first element is an array, use its first element
          const first = response.singleEmployee[0];
          if (Array.isArray(first)) {
            setEmployeeDetails(first[0]);
          } else {
            setEmployeeDetails(first);
          }
        }
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    if (id && employee && employee.employee_token) {
      if (
        employee.employee_id === parseInt(id) ||
        employee.employee_role === 3
      ) {
        fetchEmployeeDetails();
      } else {
        navigate("/not-authorized"); // Redirect to a not authorized page
      }
    }
  }, [employee, id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getRoleName = () => {
    switch (employeeDetails.company_role_id) {
      case 1:
        return "Employee";
      case 2:
        return "Manager";
      case 3:
        return "Admin";
      default:
        return "Unknown";
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <Avatar
            name={`${employeeDetails.employee_first_name || ""} ${
              employeeDetails.employee_last_name || ""
            }`}
            size="150"
            round={true}
            color="#D32F2F"
            fgColor="#fff"
            maxInitials={2}
          />
          <h2>
            {(employeeDetails.employee_first_name || "") +
              (employeeDetails.employee_last_name
                ? " " + employeeDetails.employee_last_name
                : "") || "Not Provided"}
          </h2>
          <p>{getRoleName()}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <strong>Employee ID:</strong>{" "}
            {employeeDetails.employee_id || "Not Provided"}
          </div>
          <div className="detail-item">
            <strong>Email:</strong>{" "}
            {employeeDetails.employee_email || "Not Provided"}
          </div>
          <div className="detail-item">
            <strong>Phone:</strong>{" "}
            {employeeDetails.employee_phone || "Not Provided"}
          </div>
          <div className="detail-item">
            <strong>Status:</strong>{" "}
            {employeeDetails.active_employee === undefined
              ? "Not Provided"
              : employeeDetails.active_employee
              ? "Active"
              : "Inactive"}
          </div>
          <div className="detail-item">
            <strong>Role:</strong>{" "}
            {employeeDetails.company_role_name || "Not Provided"}
          </div>
          <div className="detail-item">
            <strong>Date of Employed:</strong>{" "}
            {employeeDetails.added_date
              ? formatDate(employeeDetails.added_date)
              : "Not Provided"}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeProfile;

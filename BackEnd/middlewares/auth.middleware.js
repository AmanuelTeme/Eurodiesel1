// Import the dotenv package
require("dotenv").config();
// Import the jsonwebtoken package
const jwt = require("jsonwebtoken");
// A function to verify the token received from the frontend
// Import the employee service
const employeeService = require("../services/employee.service");

const SECRET = process.env.JWT_SECRET_KEY || "your_jwt_secret";

// New middleware to verify JWT and set req.employee_email, with detailed logging
const verifyToken = (req, res, next) => {
  console.log("verifyToken called");
  // Accept token from x-access-token or authorization header
  const authHeader = req.headers["authorization"];
  const accessToken = req.headers["x-access-token"];
  console.log("Auth header:", authHeader);
  console.log("x-access-token header:", accessToken);

  let token;
  if (accessToken) {
    token = accessToken;
  } else if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  console.log("Token:", token);
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token:", err.message);
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("Decoded JWT:", decoded);
    req.employee_email =
      decoded.employee_email || decoded.emplpoyee_email || decoded.email;
    req.employee_role = decoded.employee_role;
    req.employee_id = decoded.employee_id;
    next();
  });
};

// A function to check if the user is an admin
const isAdmin = async (req, res, next) => {
  console.log("isAdmin called");
  try {
    const employee_email = req.employee_email;
    if (!employee_email) {
      console.log("Unauthorized: missing employee email");
      return res
        .status(401)
        .json({ error: "Unauthorized: missing employee email" });
    }
    const employee = await employeeService.getEmployeeByEmail(employee_email);
    // Dig deeper if employee[0] is an array
    let emp = employee;
    if (Array.isArray(emp)) {
      emp = Array.isArray(emp[0]) ? emp[0][0] : emp[0];
    }
    if (!emp) {
      console.log("Unauthorized: employee not found");
      return res
        .status(401)
        .json({ error: "Unauthorized: employee not found" });
    }
    console.log("Employee for isAdmin:", emp);
    if (emp.company_role_id === 3) {
      return next();
    } else {
      console.log("Forbidden: not admin");
      return res.status(403).json({ error: "Forbidden: not admin" });
    }
  } catch (err) {
    console.log("Server error in isAdmin middleware:", err);
    return res
      .status(500)
      .json({ error: "Server error in isAdmin middleware" });
  }
};
// A function to check if the employee is accessing their own profile
const selfProfile = async (req, res, next) => {
  const employeeId = req.params.id; // Assuming the employee ID is in the URL params
  if (parseInt(employeeId) === req.employee_id) {
    next();
  } else {
    return res.status(403).send({
      status: "fail",
      message: "You can only access your own profile!",
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
  selfProfile,
};

module.exports = {
  ...authMiddleware,
  verifyToken,
};

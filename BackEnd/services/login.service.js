// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcrypt");
// Import the employee service to get employee by email
const employeeService = require("./employee.service");
// Handle employee login
async function logIn(employeeData) {
  try {
    let returnData = {}; // Object to be returned
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );
    console.log(employee);
    if (!employee || employee.length === 0) {
      returnData = {
        status: "fail",
        message: "Employee does not exist",
      };
      return returnData;
    }
    const user = employee[0];
    if (!user.employee_password_hashed) {
      returnData = {
        status: "fail",
        message: "No password hash found",
      };
      return returnData;
    }
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      user.employee_password_hashed
    );
    if (!passwordMatch) {
      returnData = {
        status: "fail",
        message: "Incorrect password",
      };
      return returnData;
    }
    returnData = {
      status: "success",
      data: user,
    };
    return returnData;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Database error occurred during login",
      error: error.message,
    };
  }
}

// Export the function
module.exports = {
  logIn,
};

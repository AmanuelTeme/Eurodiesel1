import React, { useState, useEffect, useContext } from "react";
import getAuth from "../utils/auth";

// Create the AuthContext
const AuthContext = React.createContext();

// Export the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create the AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const loggedInEmployee = await getAuth();
      if (loggedInEmployee?.employee_token) {
        setIsLogged(true);
        if (loggedInEmployee.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(loggedInEmployee);
        setUser(loggedInEmployee);
        // Ensure localStorage is up to date
        localStorage.setItem("employee", JSON.stringify(loggedInEmployee));
      }
    };
    fetchAuth();
  }, []);

  // Sync employee state to localStorage on change
  useEffect(() => {
    if (employee && employee.employee_token) {
      localStorage.setItem("employee", JSON.stringify(employee));
    }
  }, [employee]);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

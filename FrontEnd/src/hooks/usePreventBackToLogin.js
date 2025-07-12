import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const usePreventBackToLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLogged } = useAuth();

  useEffect(() => {
    // If user is logged in and tries to access login page, redirect to home
    if (isLogged && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [isLogged, location.pathname, navigate]);

  useEffect(() => {
    // Prevent back button from going to login page when authenticated
    const handleBeforeUnload = (event) => {
      if (isLogged) {
        // Store a flag in sessionStorage to indicate user is authenticated
        sessionStorage.setItem("isAuthenticated", "true");
      }
    };

    const handlePopState = (event) => {
      if (isLogged && sessionStorage.getItem("isAuthenticated") === "true") {
        // If user tries to go back and we're on login page, redirect to home
        if (location.pathname === "/login") {
          navigate("/", { replace: true });
        }
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isLogged, location.pathname, navigate]);

  // Clear authentication flag when user logs out
  useEffect(() => {
    if (!isLogged) {
      sessionStorage.removeItem("isAuthenticated");
    }
  }, [isLogged]);
};

export default usePreventBackToLogin;

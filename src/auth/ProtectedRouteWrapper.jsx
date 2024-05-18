import React , { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Your AuthContext path

const ProtectedRouteWrapper = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const userRole = sessionStorage.getItem('role');
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!allowedRoles.includes(userRole)) {
      navigate("/login"); // Redirect if the role is not allowed
    }
  }, [isLoggedIn, navigate, allowedRoles]);

  const userRole = sessionStorage.getItem('role');
  return <>{userRole && allowedRoles.includes(userRole) ? children : null}</>;
};

export default ProtectedRouteWrapper;
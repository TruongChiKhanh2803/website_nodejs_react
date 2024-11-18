import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, requiredRole }) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return <Navigate to="/login" />; 
    }

    try {
        const decoded = jwtDecode(accessToken);
        const userRole = decoded.role; 

        if (requiredRole !== undefined && userRole !== requiredRole) {
            return <Navigate to="/login" />; 
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;

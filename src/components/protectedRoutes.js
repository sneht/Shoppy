import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem("accessToken");
  return isAuthenticated !== null ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;

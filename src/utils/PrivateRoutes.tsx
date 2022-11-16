import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { LoginContext } from "../App";

const PrivateRoutes = () => {
  const { loginStatus } = useContext(LoginContext);
  return loginStatus === "success" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

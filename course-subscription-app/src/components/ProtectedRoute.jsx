import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  // Check if user is logged in and has the required role
  if (!user || requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.string,
};

export default ProtectedRoute; 


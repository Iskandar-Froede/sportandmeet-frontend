import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../contexts/Session.Context";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(SessionContext);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;

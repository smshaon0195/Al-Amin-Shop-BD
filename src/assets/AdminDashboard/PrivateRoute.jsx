import { Navigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loding from "./../../Loding";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loding></Loding>;
  }

  if (!user) {
    return <Navigate to="/user-admin-login" />;
  }

  return children;
};

export default PrivateRoute;

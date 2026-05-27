import { Navigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Loding from "./../../Loding";

const PrivateRoute = ({ children }) => {
  const { user, loding } = useAuth();

  if (loding) {
    return <Loding></Loding>;
  }

  if (!user) {
    return <Navigate to="/user-admin-login" />;
  }

  return children;
};

export default PrivateRoute;

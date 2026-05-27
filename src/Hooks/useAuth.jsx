import { useContext } from "react";
import { AuthContex } from "./AuthContex";

const useAuth = () => {
  const auth = useContext(AuthContex);

  return auth;
};

export default useAuth;

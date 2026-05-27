import { AuthContex } from "../Hooks/AuthContex";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Firebase.init";

const AuthProvider = ({ children }) => {
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const Authinfo = {
    signInUser,
    logOut,
  };

  return <AuthContex.Provider value={Authinfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;

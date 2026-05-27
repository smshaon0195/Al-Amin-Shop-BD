import { AuthContex } from "../Hooks/AuthContex";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./Firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // logout

  const logOut = () => {
    return signOut(auth);
  };

  // user observe
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const Authinfo = {
    user,
    loading,
    signInUser,
    logOut,
  };

  return <AuthContex.Provider value={Authinfo}>{children}</AuthContex.Provider>;
};

export default AuthProvider;

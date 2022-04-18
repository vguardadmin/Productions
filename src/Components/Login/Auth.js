import React, { useEffect, useState } from "react";
import { Auth } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import Lode from "../Others/loading";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(Auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <center>
        <Lode></Lode>
      </center>
    );
  }
  return (<AuthContext.Provider value={{
    currentUser
  }}>
    {children}
  </AuthContext.Provider>);
};

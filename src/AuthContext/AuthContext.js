import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [logIn, setLogIn] = useState(
    sessionStorage.getItem("token") !== null ? true : false
  );
  const [token, setToken] = useState(
    sessionStorage.getItem("token") !== null
      ? sessionStorage.getItem("token")
      : ""
  );
  return (
    <AuthContext.Provider value={{ logIn, setLogIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

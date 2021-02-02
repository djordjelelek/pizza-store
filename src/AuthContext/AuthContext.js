import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [logIn, setLogIn] = useState(false);
  const [token, setToken] = useState("aa");
  return (
    <AuthContext.Provider value={{ logIn, setLogIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

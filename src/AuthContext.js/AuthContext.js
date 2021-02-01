import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [ser, setSer] = useState("magare");
  return (
    <AuthContext.Provider values={{ ser }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

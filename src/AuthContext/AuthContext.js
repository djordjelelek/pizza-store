import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [logIn, setLogIn] = useState(
    sessionStorage.getItem("token") !== null ? true : false
  );
  const [userId, setUserId] = useState(
    sessionStorage.getItem("userId") !== null
      ? sessionStorage.getItem("userId")
      : ""
  );
  const [token, setToken] = useState(
    sessionStorage.getItem("token") !== null
      ? sessionStorage.getItem("token")
      : ""
  );
  const [cart, setCart] = useState(
    localStorage.getItem("cart") !== null
      ? parseInt(localStorage.getItem("cart"))
      : 0
  );

  return (
    <AuthContext.Provider
      value={{
        logIn,
        setLogIn,
        token,
        setToken,
        userId,
        setUserId,
        cart,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

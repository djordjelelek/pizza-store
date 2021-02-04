import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItems.module.css";
import { useAuth } from "../../../AuthContext/AuthContext";

const MenuItems = () => {
  const { logIn } = useAuth();
  const { setLogIn } = useAuth();
  const { setToken } = useAuth();
  const { setUserId } = useAuth();
  return (
    <>
      <li>
        <NavLink to="/home" activeStyle={{ color: "#2b2b2b" }}>
          Pizza Builder
        </NavLink>
      </li>
      <li>
        <NavLink to="/orders" activeStyle={{ color: "#2b2b2b" }}>
          Orders
        </NavLink>
      </li>
      {logIn !== true ? (
        <li className={classes.LogIn}>
          <NavLink
            to="/login"
            activeStyle={{ color: "#079438" }}
            style={{ color: "#03fc1c" }}
          >
            Log In
          </NavLink>
        </li>
      ) : (
        <li className={classes.liEl}>
          <button
            className={classes.LogOut}
            onClick={() => {
              setLogIn(false);
              setToken("");
              setUserId("");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Log Out
          </button>
        </li>
      )}
    </>
  );
};

export default MenuItems;

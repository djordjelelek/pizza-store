import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItems.module.css";
import { useAuth } from "../../../AuthContext/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const MenuItems = () => {
  const [loading, setLoading] = useState(false);
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
            activeStyle={{ color: "#007806" }}
            style={{ color: "#04d90f" }}
          >
            <strong>Log In</strong>
          </NavLink>
        </li>
      ) : (
        <li className={classes.liEl}>
          <button
            className={classes.LogOut}
            onClick={() => {
              setLoading(true);
              setLogIn(false);
              setToken("");
              setUserId("");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("userId");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            }}
          >
            <strong>Log Out</strong>
          </button>
        </li>
      )}
      {loading ? (
        <>
          <div className={classes.SpinnerContainer}></div>
          <CircularProgress color="secondary" className={classes.Spinner} />
        </>
      ) : null}
    </>
  );
};

export default MenuItems;

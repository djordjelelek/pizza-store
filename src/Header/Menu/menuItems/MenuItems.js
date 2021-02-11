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
        <NavLink to="/cart" activeStyle={{ color: "#2b2b2b" }}>
          Cart
        </NavLink>
      </li>
      {logIn ? (
        <li>
          <NavLink to="/orders-history" activeStyle={{ color: "#2b2b2b" }}>
            Orders History
          </NavLink>
        </li>
      ) : null}
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
              setTimeout(() => {
                setLogIn(false);
                setToken("");
                setUserId("");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
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

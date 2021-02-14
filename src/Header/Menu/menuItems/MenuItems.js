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
      {logIn !== true ? (
        <li className={classes.Element}>
          <NavLink
            to="/login"
            activeStyle={{ color: "black" }}
            className={classes.NavLink}
          >
            Log In
          </NavLink>
        </li>
      ) : (
        <li className={classes.Element}>
          <NavLink
            to="/home"
            activeStyle={{ color: "black" }}
            className={classes.NavLink}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLogIn(false);
                setToken("");
                setUserId("");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");
                window.location.reload();
              }, 2000);
            }}
          >
            Log Out
          </NavLink>
        </li>
      )}
      {logIn ? (
        <li className={classes.Element}>
          <NavLink
            to="/orders-history"
            activeStyle={{ color: "#2b2b2b" }}
            className={classes.NavLink}
          >
            Orders History
          </NavLink>
        </li>
      ) : null}
      <li className={classes.Element}>
        <NavLink to="/home" activeStyle={{ color: "#2b2b2b" }}>
          Pizza Builder
        </NavLink>
      </li>
      <li className={classes.Element}>
        <NavLink to="/cart" activeStyle={{ color: "#2b2b2b" }}>
          Cart
        </NavLink>
      </li>

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

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItems.module.css";
import { useAuth } from "../../../AuthContext/AuthContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
            activeStyle={{ color: "white" }}
            className={classes.NavLink}
          >
            Log In
          </NavLink>
        </li>
      ) : (
        <li className={classes.Element}>
          <NavLink
            to="/login"
            activeStyle={{ color: "white" }}
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
      <li className={classes.Element}>
        <NavLink to="/home" activeStyle={{ color: "white" }}>
          Pizza Builder
        </NavLink>
      </li>
      {logIn ? (
        <li className={classes.Element}>
          <NavLink
            to="/orders-history"
            activeStyle={{ color: "white" }}
            className={classes.NavLink}
          >
            Orders History
          </NavLink>
        </li>
      ) : null}
      <li className={classes.Element}>
        <NavLink to="/cart" activeStyle={{ color: "white" }}>
          <ShoppingCartIcon className={classes.Cart}>Cart</ShoppingCartIcon>
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

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItems.module.css";
import { useAuth } from "../../../AuthContext/AuthContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Cart: {
    ":hover": {
      color: "white",
    },
    ":active": {
      backgroundColor: "red",
    },
  },
  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "200px",
    color: "#8fcc66",
  },
}));

const MenuItems = () => {
  const [loading, setLoading] = useState(false);
  const classes2 = useStyles();
  const { logIn } = useAuth();
  const { setLogIn } = useAuth();
  const { setToken } = useAuth();
  const { setUserId } = useAuth();
  return (
    <>
      {logIn !== true ? (
        <li className={classes.Element}>
          <NavLink to="/login" activeStyle={{ color: "white" }}>
            Log In
          </NavLink>
        </li>
      ) : (
        <li className={classes.Element}>
          <NavLink
            to="/login"
            activeStyle={{ color: "white" }}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLogIn(false);
                setToken("");
                setUserId("");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");
                window.location.reload();
              }, 500);
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
          <NavLink to="/orders-history" activeStyle={{ color: "white" }}>
            Orders History
          </NavLink>
        </li>
      ) : null}
      <li className={classes.Element}>
        <NavLink to="/cart" activeStyle={{ color: "white" }}>
          <ShoppingCartIcon className={classes2.Cart}>Cart</ShoppingCartIcon>
        </NavLink>
      </li>

      {loading ? (
        <div className={classes2.SpinnerContainer}>
          <CircularProgress className={classes2.Spinner} />
        </div>
      ) : null}
    </>
  );
};

export default MenuItems;

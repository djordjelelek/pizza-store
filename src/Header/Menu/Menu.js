import React, { useState } from "react";
import classesCSS from "./Menu.module.css";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  Cart: {
    ":hover": {
      color: "white",
    },
    ":active": {
      backgroundColor: "red",
    },
  },
  Element: {
    fontSize: "18px",
    paddingLeft: "10px",
    marginBottom: "-2px",
    color: "rgb(255, 255, 255)",
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "white",
    backgroundColor: "rgb(255, 15, 15)",
  },
}))(Badge);
const Menu = () => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { logIn } = useAuth();
  const { setLogIn } = useAuth();
  const { setToken } = useAuth();
  const { setUserId } = useAuth();
  const { cart } = useAuth();

  return (
    <ul className={classesCSS.Menu}>
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
                sessionStorage.removeItem("cart");
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
          <StyledBadge badgeContent={logIn ? (cart !== 0 ? cart : "0") : null}>
            <ShoppingCartIcon className={classes.Cart}>Cart</ShoppingCartIcon>
          </StyledBadge>
        </NavLink>
      </li>

      {loading ? (
        <div className={classes.SpinnerContainer}>
          <CircularProgress className={classes.Spinner} />
        </div>
      ) : null}
    </ul>
  );
};
export default Menu;

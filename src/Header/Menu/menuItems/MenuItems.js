import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MenuItems.module.css";

const menuItems = () => (
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
    {/* <li>
      <NavLink to="/signup" activeStyle={{ color: "#2b2b2b" }}>
        Sign Up
      </NavLink>
    </li> */}
    <li className={classes.LogIn}>
      <NavLink
        to="/login"
        activeStyle={{ color: "#020A60" }}
        style={{ color: "#0572ec" }}
      >
        Log In
      </NavLink>
    </li>
    {/* <li className={classes.LogIn}>Log Out</li> */}
  </>
);

export default menuItems;

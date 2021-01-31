import React from "react";
import classes from "./Menu.module.css";

const menu = () => (
  <ul className={classes.Menu}>
    <li className={classes.MenuItem} link="/">
      <a href="/">Pizza Builder</a>
    </li>
    {/* <li className={classes.MenuItem} link="/">
      <a href="/">Checkout</a>
    </li> */}
  </ul>
);
export default menu;

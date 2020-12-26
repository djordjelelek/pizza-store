import React from "react";
import LogImg from "./pizza-logo.jpg";
import classes from "./Logo.module.css";

const logo = () => (
  <img src={LogImg} alt="pizza-logo" className={classes.Logo} />
);

export default logo;

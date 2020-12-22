import React from "react";
import classes from "./Ketchup.module.css";

const ketchup = () => {
  return <div className={`${classes.topping} ${classes.ketchup}`}></div>;
};

export default ketchup;

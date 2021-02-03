import React from "react";
import LogImg from "./logo-header.png";
import classes from "./Logo.module.css";
import { useHistory } from "react-router-dom";

const Logo = () => {
  const history = useHistory();
  return (
    <img
      src={LogImg}
      alt="iaf-logo"
      className={classes.Logo}
      onClick={() => history.push("/home")}
    />
  );
};

export default Logo;

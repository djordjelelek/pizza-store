import React from "react";
import Aux from "../../hoc/Auxilliary";
import classes from "./Layout.module.css";

const layout = (props) => (
  <Aux>
    <div className={classes.Content}>{props.children}</div>
  </Aux>
);

export default layout;

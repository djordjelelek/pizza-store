import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => {
  // console.log(props.ingredients);
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={props.ingredients ? classes.Add : classes.Remove}
        onClick={props.changeButton.bind(this, props.type)}
      >
        Add/Remove
      </button>
    </div>
  );
};
export default buildControl;

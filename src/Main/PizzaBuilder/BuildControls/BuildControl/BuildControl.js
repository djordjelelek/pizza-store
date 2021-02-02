import React from "react";
import classes from "./BuildControl.module.css";
import Button from "@material-ui/core/Button";

const buildControl = (props) => {
  // console.log(props.ingredients);
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      {props.ingredients ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={props.changeButton.bind(this, props.type)}
        >
          Add
        </Button>
      ) : (
        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={props.changeButton.bind(this, props.type)}
        >
          Remove
        </Button>
      )}
    </div>
  );
};
export default buildControl;

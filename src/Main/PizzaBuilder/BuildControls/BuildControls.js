import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import Button from "@material-ui/core/Button";

const ingridents = [
  { label: "Bacon", type: "bacon" },
  { label: "BeefSauce", type: "beefSauce" },
  { label: "Chicken", type: "chicken" },
  { label: "Ham", type: "ham" },
  { label: "Ketchup", type: "ketchup" },
  { label: "Meyo", type: "meyo" },
  { label: "Mushrooms", type: "mushrooms" },
  { label: "Olives", type: "olives" },
  { label: "Onions", type: "onions" },
  { label: "Peppers", type: "peppers" },
  { label: "Pepperoni", type: "pepperoni" },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {ingridents.map((ingrident) => (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{ingrident.label}</div>
        {props.ingredients[ingrident.type] ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={props.changeButton.bind(this, ingrident.type)}
          >
            Add
          </Button>
        ) : (
          <Button
            variant="contained"
            color="default"
            size="small"
            onClick={() => props.changeButton(ingrident.type)}
          >
            Remove
          </Button>
        )}
      </div>
    ))}
    <p>
      Current price: <strong>{props.price} RSD</strong>
    </p>
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.OrderButton}
      onClick={props.showRecipe}
    >
      Order
    </Button>
  </div>
);

export default buildControls;

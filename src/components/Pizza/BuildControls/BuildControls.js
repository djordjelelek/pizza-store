import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
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
    {controls.map((c) => (
      <BuildControl
        key={c.label}
        label={c.label}
        type={c.type}
        changeButton={props.changeButton}
        ingredients={props.ingredients[c.type]}
      />
    ))}
    <p>
      Current price: <strong>{props.price} RSD</strong>
    </p>
    <button className={classes.OrderButton} onClick={props.showRecipe}>
      ORDER
    </button>
  </div>
);

export default buildControls;

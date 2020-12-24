import React from "react";

import classes from "./Pizza.module.css";
import PizzaIngridiants from "./PizzaIngridiants/PizzaIngridiants";

const pizza = (props) => {
  return (
    <div className={classes.pizza_container}>
      <div className={classes.pizza}>
        {props.ingredients.map((x, index) => {
          return <PizzaIngridiants type={x} key={index} />;
        })}
      </div>
    </div>
  );
};

export default pizza;

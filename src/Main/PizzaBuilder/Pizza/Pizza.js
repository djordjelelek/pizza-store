import React from "react";
import classes from "./Pizza.module.css";
import PizzaIngridiants from "./PizzaIngridiants/PizzaIngridiants";

const pizza = (props) => {
  return (
    <div className={classes.pizza_container}>
      <div className={classes.pizza}>
        {props.ingredients.map((ingrident, index) => {
          return <PizzaIngridiants type={ingrident} key={index} />;
        })}
      </div>
    </div>
  );
};

export default pizza;

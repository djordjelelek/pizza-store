import React, { useState } from "react";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import classes from "./PizzaBuilder.module.css";

const PizzaBuilder = () => {
  const [ingredients, setIngredients] = useState({
    ketchup: { price: 1, show: false },
    ham: { price: 1, show: false },
    mushrooms: { price: 1, show: false },
    meyo: { price: 1, show: false },
    chicken: { price: 60, show: false },
    beefSauce: { price: 30, show: false },
    bacon: { price: 40, show: false },
    onions: { price: 10, show: false },
    peppers: { price: 10, show: false },
    pepperoni: { price: 10, show: false },
    olives: { price: 20, show: false },
  });

  const ingridientsTrue = Object.keys(ingredients).filter(
    (el) => ingredients[el].show
  );

  return (
    <div className={classes.PizzaBuilder}>
      <Pizza ingredients={ingridientsTrue} />
      <BuildControls
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
    </div>
  );
};

export default PizzaBuilder;

import React from "react";
//Pizza Ingridients
import Bacon from "./Bacon/Bacon";
import BeffSauce from "./BeefSauce/BeffSauce";
import Chicken from "./Chicken/Chicken";
import Ham from "./Ham/Ham";
import Ketchup from "./Ketchup/Ketchup";
import Meyo from "./Meyo/Meyo";
import Mushrooms from "./Mushrooms/Mushrooms";
import Olives from "./Olives/Olives";
import Onions from "./Onions/Onions";
import Peppers from "./Peppers/Peppers";

const BurgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "bacon":
      ingredient = <Bacon />;
      break;
    case "beefSauce":
      ingredient = <BeffSauce />;
      break;
    case "chicken":
      ingredient = <Chicken />;
      break;
    case "ham":
      ingredient = <Ham />;
      break;
    case "ketchup":
      ingredient = <Ketchup />;
      break;
    case "meyo":
      ingredient = <Meyo />;
      break;
    case "mushrooms":
      ingredient = <Mushrooms />;
      break;
    case "olives":
      ingredient = <Olives />;
      break;
    case "onions":
      ingredient = <Onions />;
      break;
    case "peppers":
      ingredient = <Peppers />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

export default BurgerIngredient;

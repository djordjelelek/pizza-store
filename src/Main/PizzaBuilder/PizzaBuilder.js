import React, { useState } from "react";
import Pizza from "./Pizza/Pizza";
import BuildControls from "./BuildControls/BuildControls";
import Modal from "./UI/Modal";
import axios from "../../axios-order-list";

const price = {
  ketchup: 1,
  ham: 1,
  mushrooms: 1,
  meyo: 1,
  chicken: 60,
  beefSauce: 30,
  bacon: 40,
  onions: 10,
  peppers: 10,
  pepperoni: 10,
  olives: 20,
};
const PizzaBuilder = () => {
  const [ingredients, setIngredients] = useState({
    ketchup: false,
    ham: false,
    mushrooms: false,
    meyo: false,
    chicken: false,
    beefSauce: false,
    bacon: false,
    onions: false,
    peppers: false,
    pepperoni: false,
    olives: false,
  });
  const [currentPrice, setCurrentPrice] = useState(130);
  const [showRecipe, setShowRecipe] = useState(false);

  // changeButtonHanler = (arg) => {
  //   let ingredient = [...ingredients];
  //   ingredient[arg] = !ingredient[arg];
  //   let currentPrice = currentPrice;
  //   if (ingredient[arg]) currentPrice += price[arg];
  //   else currentPrice -= price[arg];

  //   this.setState({
  //     ingredients: ingredient,
  //     currentPrice: currentPrice,
  //   });
  // };
  const showRecipeHandler = () => {
    setShowRecipe(true);
  };
  const hideRecipeHandler = () => {
    setShowRecipe(false);
  };
  // buyingHandler = () => {
  //   this.setState({
  //     showRecipe: false,
  //   });
  //   const stateKeys = this.state.ingredients;
  //   const filterState = Object.keys(stateKeys).filter((k) => stateKeys[k]);

  //   const finalRecipe = {
  //     recipe: filterState,
  //     price: this.state.currentPrice,
  //     adress: "Danila Djokica, Sokolac",
  //   };
  //   axios
  //     .post("/post/order.json", finalRecipe)
  //     .then((response) => {
  //       if (alert("Your pizza is prepering!")) {
  //       } else window.location.reload();
  //       console.log(response);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const stateKeys = ingredients;
  const filterState = Object.keys(stateKeys).filter((k) => stateKeys[k]);
  return (
    <>
      <Pizza ingredients={filterState} />
      <BuildControls
        // changeButton={changeButtonHanler}
        price={currentPrice}
        ingredients={ingredients}
        showRecipe={showRecipeHandler}
      />
      <Modal
        recipe={filterState}
        price={price}
        totalPrice={currentPrice}
        showRecipe={showRecipe}
        hideRecipe={hideRecipeHandler}
        // buy={buyingHandler}
      />
    </>
  );
};

export default PizzaBuilder;

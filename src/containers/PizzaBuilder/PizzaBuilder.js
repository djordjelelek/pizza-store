import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Pizza from "../../components/Pizza/Pizza";
import BuildControls from "../../components/Pizza/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal";
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
class PizzaBuilder extends Component {
  state = {
    ingredients: {
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
    },
    currentPrice: 130,
    showRecipe: false,
    showSpinner: false,
  };
  changeButtonHanler = (arg) => {
    let ingredient = this.state.ingredients;
    ingredient[arg] = !ingredient[arg];
    let currentPrice = this.state.currentPrice;
    if (ingredient[arg]) currentPrice += price[arg];
    else currentPrice -= price[arg];
    this.setState({
      ingredients: ingredient,
      currentPrice: currentPrice,
    });
  };
  showRecipeHandler = () => {
    this.setState({
      showRecipe: true,
    });
  };
  hideRecipeHandler = () => {
    this.setState({
      showRecipe: false,
    });
  };
  spinnerHandler = () => {
    this.setState({
      showSpinner: true,
    });
  };
  buyingHandler = () => {
    this.setState({
      showRecipe: false,
      showSpinner: true,
    });
    const stateKeys = this.state.ingredients;
    const filterState = Object.keys(stateKeys).filter((k) => stateKeys[k]);

    const finalRecipe = {
      recipe: filterState,
      price: this.state.currentPrice,
      adress: "Danila Djokica, Sokolac",
    };
    axios
      .post("/post/order.json", finalRecipe)
      .then((response) => {
        if (alert("Your pizza is prepering!")) {
        } else window.location.reload();
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  render() {
    const stateKeys = this.state.ingredients;
    const filterState = Object.keys(stateKeys).filter((k) => stateKeys[k]);
    return (
      <Aux>
        <Pizza ingredients={filterState} />
        <BuildControls
          changeButton={this.changeButtonHanler}
          price={this.state.currentPrice}
          ingredients={this.state.ingredients}
          showRecipe={this.showRecipeHandler}
        />
        <Modal
          recipe={filterState}
          price={price}
          totalPrice={this.state.currentPrice}
          showRecipe={this.state.showRecipe}
          hideRecipe={this.hideRecipeHandler}
          buy={this.buyingHandler}
          showSpinner={this.state.showSpinner}
        />
      </Aux>
    );
  }
}

export default PizzaBuilder;

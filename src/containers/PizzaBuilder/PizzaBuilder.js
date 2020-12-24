import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Pizza from "../../components/Pizza/Pizza";
import BuildControls from "../../components/Pizza/BuildControls/BuildControls";
import OrderList from "../../components/UI/OrderList";

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
        <OrderList
          recipe={filterState}
          price={price}
          totalPrice={this.state.currentPrice}
          showRecipe={this.state.showRecipe}
          hideRecipe={this.hideRecipeHandler}
        />
      </Aux>
    );
  }
}

export default PizzaBuilder;

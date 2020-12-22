import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Pizza from "../../components/Pizza/Pizza";

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
  };
  render() {
    const stateKeys = this.state.ingredients;
    const filterState = Object.keys(stateKeys).filter((k) => stateKeys[k]);

    return (
      <Aux>
        <Pizza ingredients={filterState} />
        <div>Build Control</div>
      </Aux>
    );
  }
}

export default PizzaBuilder;

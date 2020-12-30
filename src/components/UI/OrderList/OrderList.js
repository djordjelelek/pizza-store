import React from "react";
import classes from "./OrderList.module.css";

const orderList = (props) => (
  <>
    <h1>RECIPE</h1>
    <ol>
      <li>pizza: 130 RSD</li>
      {props.recipe.map((ingr) => (
        <li key={ingr}>
          {ingr}: {props.price[ingr]} RSD
        </li>
      ))}
    </ol>
    <p>Total price: {props.totalPrice}</p>
    <button
      className={[classes.Button, classes.Danger].join(" ")}
      onClick={props.hideRecipe}
    >
      CANCEL
    </button>
    <button
      className={[classes.Button, classes.Success].join(" ")}
      onClick={props.buy}
    >
      BUY
    </button>
  </>
);

export default orderList;

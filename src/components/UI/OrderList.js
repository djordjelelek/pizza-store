import React from "react";
import classes from "./OrderList.module.css";

const alertHandler = () => {
  // alert("You Buy!!");
  if (alert("Your pizza is prepering!")) {
  } else window.location.reload();
};

const orderList = (props) => {
  let finalRecipe = (
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
        onClick={alertHandler}
      >
        BUY
      </button>
    </>
  );
  return props.showRecipe ? (
    <div className={classes.OrderList}>{finalRecipe}</div>
  ) : null;
};
export default orderList;

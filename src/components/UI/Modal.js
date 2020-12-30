import React from "react";
import classes from "./Modal.module.css";
import OrderList from "./OrderList/OrderList";
import Spinner from "../UI/Spinner/Spinner";

const modal = (props) =>
  props.showRecipe ? (
    <div className={classes.Modal}>
      <OrderList
        recipe={props.recipe}
        price={props.price}
        totalPrice={props.totalPrice}
        hideRecipe={props.hideRecipe}
        buy={props.buy}
      />
    </div>
  ) : props.showSpinner ? (
    <div className={classes.Modal}>
      <Spinner />
    </div>
  ) : null;

export default modal;

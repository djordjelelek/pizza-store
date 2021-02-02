import React from "react";
import classes from "./Modal.module.css";
import OrderList from "./OrderList/OrderList";
import Modal from "@material-ui/core/Modal";

const modal = (props) =>
  //   <Modal
  //     // open={open}
  //     onClose={props.showRecipe}
  //     aria-labelledby="simple-modal-title"
  //     aria-describedby="simple-modal-description"
  //   >
  //     <OrderList
  //       recipe={props.recipe}
  //       price={props.price}
  //       totalPrice={props.totalPrice}
  //       hideRecipe={props.hideRecipe}
  //       buy={props.buy}
  //     />
  //   </Modal>
  // );

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
    <div className={classes.Modal}></div>
  ) : null;

export default modal;

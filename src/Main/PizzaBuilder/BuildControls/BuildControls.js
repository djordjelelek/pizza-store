import React, { useState } from "react";
import classes from "./BuildControls.module.css";
import Button from "@material-ui/core/Button";

import Modal from "@material-ui/core/Modal";
import Receipt from "./Receipt/Receipt";

const BuildControls = (props) => {
  const [price, setPrice] = useState(130);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleOpenClose = () => {
    setShowRecipe(!showRecipe);
  };
  const changeButtonHanler = (ingr) => {
    const ingidentsUpdate = { ...props.ingredients };
    ingidentsUpdate[ingr].show = !props.ingredients[ingr].show;
    props.setIngredients({ ...ingidentsUpdate });
    setPrice((price) => price + props.ingredients[ingr].price);
  };
  return (
    <div>
      <div className={classes.BuildControls}>
        {Object.keys(props.ingredients).map((ingrident, index) => (
          <div className={classes.BuildControl} key={index}>
            <div className={classes.Label}>{ingrident}</div>
            {props.ingredients[ingrident].show ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => changeButtonHanler(ingrident)}
              >
                Add
              </Button>
            ) : (
              <Button
                variant="contained"
                color="default"
                size="small"
                onClick={() => changeButtonHanler(ingrident)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <p>
          Current price: <strong>{price} RSD</strong>
        </p>
        <Modal
          open={showRecipe}
          onClose={handleOpenClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Receipt
            ingredients={props.ingredients}
            price={price}
            setShowRecipe={setShowRecipe}
          />
        </Modal>
        <Button
          disabled={price === 130}
          variant="contained"
          color="primary"
          size="large"
          className={classes.OrderButton}
          type="button"
          onClick={handleOpenClose}
        >
          Order
        </Button>
      </div>
    </div>
  );
};

export default BuildControls;

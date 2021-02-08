import React, { useState } from "react";
import classes from "./BuildControls.module.css";
import Button from "@material-ui/core/Button";
import Receipt from "./Receipt/Receipt";

const BuildControls = (props) => {
  const [price, setPrice] = useState(130);
  const [showRecipe, setShowRecipe] = useState(false);

  const handleOpen = () => {
    setShowRecipe(true);
  };

  const handleClose = () => {
    setShowRecipe(false);
  };
  const changeButtonHanler = (ingr, value) => {
    const ingidentsUpdate = { ...props.ingredients };
    ingidentsUpdate[ingr].show = !props.ingredients[ingr].show;
    props.setIngredients({ ...ingidentsUpdate });
    if (value === "add")
      setPrice((price) => price + props.ingredients[ingr].price);
    else if (value === "remove")
      setPrice((price) => price - props.ingredients[ingr].price);
  };
  return (
    <div className={classes.BuildControls}>
      {Object.keys(props.ingredients).map((ingrident, index) => (
        <div className={classes.BuildControl} key={index}>
          {props.ingredients[ingrident].show ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => changeButtonHanler(ingrident, "remove")}
            >
              Remove {ingrident}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="default"
              size="small"
              onClick={() => changeButtonHanler(ingrident, "add")}
            >
              Add {ingrident}
            </Button>
          )}
        </div>
      ))}
      <h1 className={classes.Header}>
        &nbsp;&nbsp;Current price: <strong>{price} RSD</strong>&nbsp;&nbsp;
      </h1>
      <Receipt
        ingredients={props.ingredients}
        price={price}
        setShowRecipe={setShowRecipe}
        showRecipe={showRecipe}
        handleClose={handleClose}
      />
      <Button
        disabled={price === 130}
        variant="contained"
        color="primary"
        size="large"
        className={classes.OrderButton}
        type="button"
        onClick={() => handleOpen()}
      >
        Order
      </Button>
    </div>
  );
};

export default BuildControls;

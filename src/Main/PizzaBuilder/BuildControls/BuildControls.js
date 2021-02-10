import React, { useState } from "react";
import classes from "./BuildControls.module.css";
import Button from "@material-ui/core/Button";
import Receipt from "./Receipt/Receipt";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import SnackBar from "./SnackBar/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "red",
    position: "relative",
    margin: "0px",
    marginBottom: "0px",
    padding: "10px",
    // paddingTop: "20px",
    // paddingBottom: "0px",
  },
  buttons: {
    paddingLeft: "40px",
    paddingRight: "40px",
    paddingBottom: "5px",
  },
}));

const BuildControls = (props) => {
  const [price, setPrice] = useState(130);
  const classes = useStyles();

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
    <Container className={classes.root}>
      {Object.keys(props.ingredients).map((ingrident, index) => (
        <div className={classes.buttons} key={index}>
          {props.ingredients[ingrident].show ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={() => changeButtonHanler(ingrident, "remove")}
            >
              Remove {ingrident}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="default"
              size="small"
              fullWidth
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
      {/* <Receipt
        ingredients={props.ingredients}
        price={price}
        setShowRecipe={setShowRecipe}
        showRecipe={showRecipe}
        handleClose={handleClose}
      /> */}
      {/* <Button
        disabled={price === 130}
        variant="contained"
        color="primary"
        size="large"
        // className={classes.OrderButton}
        type="button"
        onClick={() => handleOpen()}
      >
        Order
      </Button> */}
      <SnackBar
        price={price}
        ingredients={props.ingredients}
        setIngredients={props.setIngredients}
      />
    </Container>
  );
};

export default BuildControls;

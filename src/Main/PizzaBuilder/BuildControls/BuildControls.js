import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import SnackBar from "./SnackBar/SnackBar";
import { useAuth } from "../../../AuthContext/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // textAlign: "center",
    backgroundColor: "#ffffff00",
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
  Header: {
    fontSize: "20px",
  },
}));

const BuildControls = (props) => {
  const [price, setPrice] = useState(130);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const { logIn } = useAuth();

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
              onClick={
                logIn
                  ? () => changeButtonHanler(ingrident, "add")
                  : () => setOpen(true)
              }
            >
              Add {ingrident}
            </Button>
          )}
        </div>
      ))}
      <h1 className={classes.Header}>
        &nbsp;&nbsp;Current price: <strong>{price} RSD</strong>&nbsp;&nbsp;
      </h1>
      <SnackBar
        price={price}
        ingredients={props.ingredients}
        setIngredients={props.setIngredients}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};

export default BuildControls;

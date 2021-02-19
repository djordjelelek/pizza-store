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
    backgroundColor: "rgba(115, 41, 18, 0.4)",
    position: "relative",
    margin: "0px",
    marginBottom: "0px",
    // padding: "10px",
    height: "100%",
    // paddingTop: "20px",
    // paddingBottom: "0px",
  },
  buttons: {
    // paddingLeft: "40px",
    // paddingRight: "40px",
    // paddingBottom: "5px",
  },
  MuiButton: {
    color: "rgb(73, 134, 231)",
    // backgroundColor: "rgba(115, 41, 18, 0.4)",
    "&:hover": {
      color: "rgb(58, 105, 181)",
    },
  },
  MuiButton2: {
    color: "rgb(255, 117, 55)",
    "&:hover": {
      color: "red",
    },
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
              color="primary"
              size="small"
              fullWidth
              className={classes.MuiButton}
              onClick={() => changeButtonHanler(ingrident, "remove")}
            >
              Remove {ingrident}
            </Button>
          ) : (
            <Button
              color="primary"
              size="small"
              fullWidth
              className={classes.MuiButton2}
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

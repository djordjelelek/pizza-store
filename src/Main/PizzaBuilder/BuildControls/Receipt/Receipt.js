import React, { useState } from "react";
import classesCSS from "./Receipt.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, CircularProgress, Button } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "../../../../AuthContext/AuthContext";
import { useHistory } from "react-router-dom";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: "white",
    color: "black",
    fontSize: "15px",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
    textAlign: "center",
  },
}));

const Receipt = (props) => {
  const [modalStyle] = useState(getModalStyle);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const classes = useStyles();
  const { token } = useAuth();
  const { userId } = useAuth();
  const { logIn } = useAuth();

  const listItems = Object.keys(props.ingredients).filter(
    (el) => props.ingredients[el].show
  );

  const purchaseHanler = () => {
    const day = new Date().getDay();
    const mounth = new Date().getDate() - 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getMinutes();
    const finalRecipe = {
      userId: userId,
      recipe: listItems,
      price: props.price,
      date:
        "Date: " +
        day +
        "." +
        mounth +
        "." +
        year +
        ". Time: " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds,
    };

    axios
      .post(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/orders.json?auth=" +
          token,
        finalRecipe
      )
      .then(() => {
        setLoading(true);
        setTimeout(() => {
          history.push("/home");
        }, 2000);
      });
  };
  const body = logIn ? (
    <div style={modalStyle} className={classes.paper}>
      <h2>RECIPE</h2>
      <ol>
        <li>pizza: 130 RSD</li>
        {listItems.map((ingr, index) => (
          <li key={index}>
            {ingr}: {props.ingredients[ingr].price} RSD
          </li>
        ))}
      </ol>
      <p>
        <strong>price: {props.price} RSD</strong>
      </p>
      <p>
        <strong>discount: 20%</strong>
      </p>
      <h3>
        <strong>
          final price: {Math.round(props.price * 0.8 * 100) / 100} RSD
        </strong>
      </h3>

      <Button
        variant="contained"
        color="primary"
        onClick={() => purchaseHanler()}
        className={classes.button}
      >
        Buy
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.setShowRecipe(false)}
      >
        Cancel
      </Button>
      {loading ? (
        <div className={classesCSS.SpinnerContainer}>
          <CircularProgress />
        </div>
      ) : null}
    </div>
  ) : (
    <div style={modalStyle} className={classes.paper}>
      <h1 className={classesCSS.NoOrders}>
        You are not signed in
        <br /> Please{" "}
        <a href="/login" className={classesCSS.Link}>
          LogIn
        </a>{" "}
        or{" "}
        <a href="/signup" className={classesCSS.Link}>
          SignUp
        </a>{" "}
        for 20% discount on each order
      </h1>
    </div>
  );
  return (
    <Modal
      open={props.showRecipe}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};

export default Receipt;

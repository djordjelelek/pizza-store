import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: "10%",
    left: "15%",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "blue",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Receipt = (props) => {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const listItems = Object.keys(props.ingredients).filter(
    (el) => props.ingredients[el].show
  );

  const purchaseHanler = () => {
    const day = new Date().getDay();
    const mounth = new Date().getDate();
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getMinutes();
    const finalRecipe = {
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
        "https://pizza-app-rg-default-rtdb.firebaseio.com/orders.json",
        finalRecipe
      )
      .then((response) => {
        // if (alert("Your pizza is prepering!")) {
        // } else window.location.reload();
        console.log(response);
      });
  };

  return (
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
      <p>Total price: {props.price}</p>

      <Button
        variant="contained"
        color="primary"
        onClick={() => purchaseHanler()}
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
    </div>
  );
};

export default Receipt;

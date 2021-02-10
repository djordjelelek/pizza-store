import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Header: {
    textAlign: "center",
  },
  Text: {
    // backgroundColor: "red",
    // maxWidth: "80%",
  },
  ContainerElement: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  Ingridients: {
    fontSize: "15px",
    maxWidth: "80%",
    textAlign: "justify",
  },
  Price: {
    fontSize: "15px",
    height: "100%",
    right: 0,
    textAlign: "end",
    // marginTop: "-45px",
  },
}));
function Receipt(props) {
  const classes = useStyles();

  const finalReciept = props.ordersList.map((el, index) => (
    <div className={classes.ContainerElement}>
      <div className={classes.Ingridients}>
        <p>
          <strong>ingridents: </strong>
          {`${el.recipe.map((el) => " " + el)}`}
        </p>
      </div>
      <p>
        <div className={classes.Price}>
          {`${Math.round((el.price * 0.8 * 100) / 100).toFixed(2)}`} RSD
        </div>
      </p>
    </div>
  ));
  const finalPrice = Math.round(
    props.ordersList
      .map((el) => (el.price * 0.8 * 100) / 100)
      .reduce((el, res) => el + res)
  ).toFixed(2);
  return (
    <Dialog
      open={props.openReceipt}
      onClose={() => props.handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.Container}
    >
      <DialogTitle id="alert-dialog-title" className={classes.Header}>
        {"Final Receipt"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          className={classes.Text}
        >
          {finalReciept}
        </DialogContentText>
      </DialogContent>
      <DialogTitle id="alert-dialog-title">
        {"Final prize: "}
        {finalPrice}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => props.handleClose()} color="primary">
          Disagree
        </Button>
        <Button onClick={() => props.handleClose()} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Receipt;

import React from "react";
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
}));

function Receipt(props) {
  const classes = useStyles();
  //   const finalReciept = props.ordersList.map((el) => el.ingridiants);
  props.ordersList.map((el, index) => console.log(el.recipe));
  props.ordersList.map((el, index) => console.log(el.price));
  console.log(props.ordersList);
  return (
    <Dialog
      open={props.openReceipt}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.Header}>
        {"Final Receipt"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          safdsaf
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={props.handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Receipt;

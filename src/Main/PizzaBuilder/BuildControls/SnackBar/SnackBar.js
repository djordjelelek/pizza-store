import React from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext/AuthContext";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);
  const { token } = useAuth();
  const { userId } = useAuth();
  const { logIn } = useAuth();

  const listItems = Object.keys(props.ingredients).filter(
    (el) => props.ingredients[el].show
  );

  const handleClick = () => {
    setOpen(true);
    if (logIn) {
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

      axios.post(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/carts.json?auth=" +
          token,
        finalRecipe
      );
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button
        disabled={props.price === 130}
        variant="contained"
        color="primary"
        size="large"
        type="button"
        onClick={handleClick}
      >
        Add to Cart
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={logIn ? "Add to Cart" : <a href="/login">LogIn</a>}
        action={
          <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button> */}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

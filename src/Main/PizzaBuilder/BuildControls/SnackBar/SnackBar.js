import React from "react";
import axios from "axios";
import { useAuth } from "../../../../AuthContext/AuthContext";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  snackbar: {
    backgroundColor: "white",
    color: "darkslategray",
  },
  Link: {
    textDecoration: "none",
    color: "rgb(73, 134, 231)",
  },
  MuiButton: {
    backgroundColor: "#8fcc66",
    marginBottom: "0px",
    bottom: 0,
    "&:hover": {
      backgroundColor: "#74a653",
    },
  },
}));

export default function SimpleSnackbar(props) {
  const { token } = useAuth();
  const { userId } = useAuth();
  const { logIn } = useAuth();
  const { setCart } = useAuth();
  const classes = useStyles();

  const listItems = Object.keys(props.ingredients).filter(
    (el) => props.ingredients[el].show
  );

  const handleClick = () => {
    props.setOpen(true);
    if (logIn) {
      const cartStorage = parseInt(sessionStorage.getItem("cart"));
      sessionStorage.setItem("cart", cartStorage + 1);
      setCart(() => cartStorage + 1);

      const day = new Date().getDate();
      const mounth = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const finalRecipe = {
        userId: userId,
        recipe: listItems,
        price: props.price,
        time:
          day +
          "." +
          mounth +
          "." +
          year +
          ". " +
          (hours < 10 ? 0 + hours : "") +
          hours +
          ":" +
          (minutes < 10 ? 0 : "") +
          minutes +
          "h",
      };
      axios.post(
        "https://pizza-app-rg-default-rtdb.firebaseio.com/carts.json?auth=" +
          token,
        finalRecipe
      );
    }
    const ingidentsUpdate = { ...props.ingredients };
    for (const value in ingidentsUpdate) {
      ingidentsUpdate[value].show = false;
    }
    props.setIngredients({ ...ingidentsUpdate });
    props.setPrice(130);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  return (
    <div>
      <Button
        disabled={props.price === 130}
        variant="contained"
        color="primary"
        type="button"
        onClick={handleClick}
        className={classes.MuiButton}
      >
        Add to Cart
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={props.open}
        color="primary"
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="black"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        {logIn ? (
          <Alert
            onClose={handleClose}
            severity="success"
            className={classes.snackbar}
          >
            Added to Cart
          </Alert>
        ) : (
          <Alert severity="info" className={classes.snackbar}>
            Please{" "}
            <a href="/login" className={classes.Link}>
              Log In
            </a>
          </Alert>
        )}
      </Snackbar>
    </div>
  );
}

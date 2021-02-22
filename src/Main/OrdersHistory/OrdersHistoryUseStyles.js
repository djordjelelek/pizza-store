import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
    marginBottom: "42px",
  },
  Header: {
    marginTop: "22px",
    marginBottom: "12px",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: "rgba(128, 211, 255, 0.4)",
    position: "relative",
    textAlign: "left",
    margin: "5px",
    marginBottom: "-7px",
    height: "auto",
    width: "430px",
    color: "darkslategray",
    paddingBottom: "0px",
    paddingLeft: "0px",
    paddingRight: "0px",
    paddingTop: "0px",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
  },
  control: {
    padding: theme.spacing(2),
  },
  Ingridients: {
    maxWidth: "70%",
  },
  List: {
    width: "100%",
  },
  Prices: {
    top: 0,
    textAlign: "end",
  },

  NoOrders: {
    color: "rgb(255, 255, 255)",
    padding: "70px",
  },
  Link: {
    textDecoration: "none",
    color: "rgb(73, 134, 231)",
  },
  SpinnerContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backdropFilter: "blur(2px)",
    zIndex: 1,
  },
  Spinner: {
    marginTop: "200px",
    color: "#8fcc66",
  },
}));

export default useStyles;

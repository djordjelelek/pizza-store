import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginLeft: "auto",
    marginBottom: "42px",
  },
  root: {
    flexGrow: 1,
  },
  Header: {
    marginTop: "22px",
    marginBottom: "14px",
  },
  paper: {
    backgroundColor: "rgba(255, 211, 128, 0.4)",
    position: "relative",
    textAlign: "left",
    margin: "5px",
    marginBottom: "-7px",
    height: "auto",
    width: "370px",
    color: "darkslategray",
    paddingBottom: "0.1px",
    paddingLeft: "17px",
    paddingRight: "17px",
    paddingTop: "0px",
    boxShadow: "4px 4px 15px  grey",
    borderRadius: "6px",
  },
  control: {
    padding: theme.spacing(2),
  },
  MuiButton2: {
    backgroundColor: "#8fcc66",
    "&:hover": {
      backgroundColor: "#74a653",
    },
    marginBottom: "22px",
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

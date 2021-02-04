import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classesCSS from "./SignUp.module.css";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../../AuthContext/AuthContext";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: "25px",
    marginBottom: "-6px",
  },
}));

export default function SignUp() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [alertShow, setAlertShow] = useState(false);
  const [alertText, setAlertText] = useState("");

  const { setToken } = useAuth();
  const { setLogIn } = useAuth();
  const { setUserId } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== passwordRepeat) {
      setAlertText("Password and Retipe Password are not the same");
      setAlertShow(true);
    } else if (password.length <= 8) {
      setAlertText("The password is shorter than 8 characters");
      setAlertShow(true);
    } else {
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVl1sWfC2oInNN52Fni_otTw5qT8jP_To",
          {
            email: email,
            password: password,
            returnSecureToken: true,
          }
        )
        .then((resp) => {
          console.log("111111111");
          setToken(resp.data.idToken);
          setUserId(resp.data.localId);
          setLogIn(true);
          sessionStorage.setItem("token", resp.data.idToken);
          sessionStorage.setItem("userId", resp.data.localId);
          history.push("/home");
        })
        .catch(() => {
          setAlertText("You have account, already. Please log in.");
          setAlertShow(true);
        });
    }
  };
  const classes = useStyles();
  return (
    <div className={classesCSS.Container}>
      <Container component="main" maxWidth="xs" className={classes.Container}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {alertShow ? (
            <Alert className={classes.alert} variant="filled" severity="error">
              {alertText}
            </Alert>
          ) : null}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="retipe-password"
                  label="Retipe Password"
                  type="password"
                  id="retipe-password"
                  autoComplete="current-password"
                  onChange={(event) => setPasswordRepeat(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classesCSS.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

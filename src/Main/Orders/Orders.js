// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Orders = () => {
//   useEffect()(() => {
//     const getOrders = () => {
//       axios.get();
//     };
//     getOrders();
//   }, []);
//   return (
//     <div>
//       <p>aaaa</p>
//     </div>
//   );
// };

// export default Orders;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 250,
    width: 400,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={4}>
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <Grid key={value} item>
              <Paper className={classes.paper} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

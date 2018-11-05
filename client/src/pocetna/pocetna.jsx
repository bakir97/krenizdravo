import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Typography, Button, withWidth } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = {
  container: {
    marginTop: "7rem"
  },
  naslov: {
    fontSize: "10rem",
    textAlign: "center",
    background: "linear-gradient(to right, #00f260, #0575e6)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },
  naslovMali: {
    fontSize: "3rem",
    textAlign: "center",
    background: "linear-gradient(to right, #00f260, #0575e6)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  },
  dugme: {
    fontSize: "3rem",
    textAlign: "center",
    background: "linear-gradient(to right, #00f260, #0575e6)",
    WebkitBackgroundClip: "text",
    color: "transparent"
  }
};

class Pocetna extends Component {
  render() {
    const { width } = this.props;
    console.log(width);
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={styles.container}
      >
        <Grid item style={{ width: "100%" }}>
          <Typography
            style={
              width === "lg" || width === "md"
                ? styles.naslov
                : styles.naslovMali
            }
            variant="display1"
          >
            Dobrodosli na Stranicu
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography variant="display1">O meni :</Typography>
          <Typography variant="display1">Tre</Typography>
        </Grid>
        <Grid container xs={12} item justify="center" alignItems="flex-start">
          <Button>
            <Typography style={styles.dugme}> Sign In</Typography>
          </Button>
        </Grid>
      </Grid>
    );
  }
}
export default withWidth()(withStyles(styles)(Pocetna));

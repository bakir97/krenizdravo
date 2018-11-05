import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Avatar, Grid, Badge } from "@material-ui/core";
import TimeAgo from "react-timeago";

const styles = theme => ({
  root: {
    position: "relative",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: "1rem"
  },
  avatar: {
    width: 60,
    height: 60
  }
});

function PaperSheet(props) {
  const { classes, nijeProcitana, brojPoruka, od, prebaciNaKorisnika } = props;

  return (
    <div>
      <Paper
        onClick={prebaciNaKorisnika(od)}
        className={classes.root}
        elevation={1}
        style={nijeProcitana ? { background: "#d7d2cc" } : null}
      >
        <div>
          <Grid container justify="center">
            <Grid container item xs={12} alignItems="center">
              {props.slika ? (
                <Avatar className={classes.avatar} src={props.slika} />
              ) : (
                <Avatar style={{ fontSize: "2rem" }} className={classes.avatar}>
                  {od.slice(0, 1)}
                </Avatar>
              )}
              <Typography
                component="h3"
                style={{
                  fontSize: "2rem",
                  marginLeft: "0.7rem",
                  marginRight: "auto"
                }}
              >
                {od}
              </Typography>
              <div>
                {nijeProcitana && (
                  <Typography
                    component="p"
                    style={{
                      fontSize: "2rem",
                      textAlign: "right",
                      color: "#BF0003"
                    }}
                  >
                    {brojPoruka}
                  </Typography>
                )}
                <Typography component="p" style={{ fontSize: "2rem" }}>
                  <TimeAgo
                    minPeriod={30}
                    date={props.datum}
                    style={{ fontSize: "1.4rem" }}
                  />
                </Typography>
              </div>
            </Grid>

            <Grid item xs={12}>
              <Typography component="p" style={{ fontSize: "1.6rem" }}>
                {props.text}
              </Typography>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaperSheet);

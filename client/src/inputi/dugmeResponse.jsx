import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: "1rem auto",
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  buttonError: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
    }
  },
  button: {
    background: "linear-gradient(to right,#45b649,#dce35b)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(69, 182, 73,.3)",
    fontSize: "1.5rem",
    textTransform: "capitalize"
  },
  iconSmall: {
    fontSize: 20,
    marginLeft: "0.5rem"
  }
});

class CircularIntegration extends React.Component {
  render() {
    const { classes, loading, success, dugmeError } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
      [classes.buttonError]: dugmeError
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={
              success || dugmeError || loading
                ? buttonClassname
                : classes.button
            }
            disabled={loading}
          >
            Promjeni
            {dugmeError || success ? null : (
              <EditIcon className={classes.iconSmall} />
            )}
            {dugmeError && <ErrorIcon style={{ marginLeft: "1rem" }} />}
            {success && <CheckIcon style={{ marginLeft: "1rem" }} />}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIntegration);

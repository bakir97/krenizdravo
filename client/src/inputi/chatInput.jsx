import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  input: {
    width: "60%",
    border: "1px solid #dce35b",
    borderRadius: 20,
    marginRight: "0.5rem",
    padding: "1rem",
    marginLeft: 0,
    "&:focus": {
      outline: "none"
    }
  }
});

const TextInput = props => {
  return (
    <Fragment>
      <input className={props.classes.input} {...props} />
    </Fragment>
  );
};

export default withStyles(styles)(TextInput);

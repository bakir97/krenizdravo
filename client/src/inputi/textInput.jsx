import React, { Fragment } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";


import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  cssLabel: {
    fontSize: '2rem',
    "&$cssFocused": {
      color: "rgba(69, 182, 73, 0.7)"
    }
  },
  cssFocused: { fontSize: '2rem'},
  cssUnderline: {
    "&:after": {
      borderBottomColor: "rgba(69, 182, 73, 0.7)"
    }
  }
});

const TextInput = ({
    noviError,
  input,
  type,
  name,
  label,
  meta: { touched, error },
  ...custom,classes
}) => {

  return (
    <Fragment>
      <FormControl  style={{width:'90%'}} error={touched && (error || noviError) ? true : false}>
        <InputLabel
          FormLabelClasses={
            touched && (error || noviError)
              ? {
                  root: classes.cssLabel
                }
              : {
                  root: classes.cssLabel,
                  focused: classes.cssFocused
                }
          }
          htmlFor={name}
        >
          {touched && (error || noviError) ? (error||noviError) : label}
        </InputLabel>

        <Input
          {...input}
          {...custom}
          name={name}
          type={type}
          className={classes.cssFocused}
          classes={{
            underline: classes.cssUnderline
          }}
          id="custom-css-input1"
        />
      </FormControl>
    </Fragment>
  );
};

export default withStyles(styles)(TextInput);

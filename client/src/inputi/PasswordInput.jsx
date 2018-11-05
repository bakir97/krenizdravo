import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  cssLabel: {
    fontSize: 2 + "rem",
    "&$cssFocused": {
      color: "rgba(69, 182, 73, 0.7)"
    }
  },
  cssFocusedPassword: { fontSize: 2 + "rem" },
  cssFocused: { fontSize: 2 + "rem", width: "100%" },
  cssUnderline: {
    "&:after": {
      borderBottomColor: "rgba(69, 182, 73, 0.7)"
    }
  }
});

class PasswordInput extends Component {
  state = {
    showPassword: ""
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  render() {
    const {
      input,
      name,
      label,
      meta: { touched, error },
      custom,
      classes,
      noviError
    } = this.props;
    return (
      <FormControl
        style={{ width: "90%" }}
        error={touched && (error || noviError) ? true : false}
      >
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
          {touched && (error || noviError) ? error || noviError : label}
        </InputLabel>
        <Input
          {...input}
          {...custom}
          name={name}
          className={classes.cssFocusedPassword}
          classes={{
            underline: classes.cssUnderline
          }}
          id={name}
          type={this.state.showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(PasswordInput);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import EmailInput from "../inputi/EmailInput";
import PasswordInput from "../inputi/PasswordInput";
import AccountCircle from "@material-ui/icons/AccountCircle";
import withWidth from "@material-ui/core/withWidth";
import { registracija } from "../akcije/RegistracijaAkcija";
import SecretIcon from "@material-ui/icons/NoEncryptionOutlined";
import { reduxForm, Field } from "redux-form";
import LockOpen from "@material-ui/icons/LockOpen";
import Email from "@material-ui/icons/EmailOutlined";
import SecretInput from "../inputi/secretInput";
import { connect } from "react-redux";
import {
  createValidator,
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  matchesField
} from "revalidate";
import TextInput from "../inputi/textInput";
const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);
const validate = combineValidators({
  username: composeValidators(
    isRequired({ message: "upisi username" }),
    hasLengthGreaterThan(5)({ message: "mora biti veci od 5" })
  )(),

  email: composeValidators(
    isValidEmail(),
    isRequired({ message: "upisi email" })
  )(),
  password: isRequired({ message: "Molim upisi password" }),
  secret: isRequired({ message: "Molim upisi secret" }),

  password1: matchesField("password")({
    message: "Passwords do not match"
  })
});

const styles = theme => ({
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
  icon: {
    height: "100%",
    paddingTop: "1.4rem"
  }
});

class Registracija extends Component {
  state = { error: "" };
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.errorNode
    });
  }
  componentDidUpdate() {}
  responseGoogle = response => {};
  submit = p => {
    this.props.registracija(p, this.props.history.push);
  };

  render() {
    const { username, email } = this.state.error;
    const { classes, width } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100%", paddingTop: "56px" }}
        alignContent="center"
      >
        <Grid
          container
          item
          alignItems="center"
          alignContent="center"
          justify="center"
          style={{ paddingTop: "3rem" }}
        >
          <form
            style={
              width === "xs" || width === "sm"
                ? { width: "70%" }
                : { width: "40%" }
            }
            autoComplete="off"
            onSubmit={this.props.handleSubmit(this.submit)}
            noValidate
          >
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <AccountCircle className={classes.icon} />
              <Field
                noviError={username}
                type="text"
                label="Username"
                name="username"
                component={TextInput}
              />
            </Grid>
            <Grid
              justify="center"
              container
              item
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <Email className={classes.icon} />
              <Field
                noviError={email}
                type="email"
                label="Email"
                name="email"
                component={EmailInput}
              />
            </Grid>
            <Grid
              justify="center"
              container
              item
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <LockOpen className={classes.icon} />
              <Field
                label="Password"
                name="password"
                component={PasswordInput}
              />
            </Grid>
            <Grid
              justify="center"
              container
              item
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <LockOpen className={classes.icon} />
              <Field
                label="Confirm Password"
                name="password1"
                component={PasswordInput}
              />
            </Grid>
            <Grid
              item
              container
              justify="center"
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <SecretIcon className={classes.icon} />
              <Field
                type="text"
                label="Secret"
                name="secret"
                component={SecretInput}
              />
            </Grid>
            <Grid
              container
              item
              justify="center"
              style={{ marginBottom: "4rem" }}
            >
              <Button type="submit" className={classes.button}>
                Registriraj
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  errorNode: state.errorNode.errorNode
});

const mapDispatchToProps = {
  registracija
};

Registracija.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: "registracija", validate })(
    withWidth()(withStyles(styles)(Registracija))
  )
);

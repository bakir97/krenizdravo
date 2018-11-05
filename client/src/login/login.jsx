import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PasswordInput from "../inputi/PasswordInput";
import GoogleLogin from "react-google-login";
import withWidth from "@material-ui/core/withWidth";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpen from "@material-ui/icons/LockOpen";

import { Typography } from "../../node_modules/@material-ui/core";
import TextInput from "../inputi/textInput";
import { Link } from "react-router-dom";
import { login, loginGoogle } from "../akcije/LoginAkcija";
import classNames from "classnames";
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
  },

  text: {
    background: "linear-gradient( to right, #45b649,#dce35b)",
    "-webkit-background-clip": "text",
    color: "transparent",
    paddingBottom: "2rem",
    fontSize: "3rem"
  },
  link: {
    textDecoration: "none",
    transition: "all 0.3s",
    "&:hover": {
      transform: "scale(1.1)"
    }
  }
});

class Login extends Component {
  state = { error: "" };
  componentDidMount() {
    console.log(this.props.loginState, "login");

    if (this.props.loginState.isAuth) {
      this.props.history.push("/objave");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.errorNode
    });
  }

  responseGoogle = response => {
    if (Object.keys(response.profileObj).length > 0) {
      this.props.loginGoogle(response.profileObj, this.props.history.push);
    }
  };
  submit = p => {
    this.props.login(p, this.props.history.push);
  };

  render() {
    const { username, password } = this.state.error;
    const { classes, width } = this.props;
    console.log(width);

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
        alignContent="center"
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={5}
          alignContent="center"
          justify="center"
          style={{ paddingTop: "3rem" }}
        >
          <form
            autoComplete="off"
            onSubmit={this.props.handleSubmit(this.submit)}
            noValidate
          >
            <Grid
              item
              container
              xs={12}
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
              container
              item
              xs={12}
              alignItems="center"
              style={{ marginBottom: "4rem" }}
            >
              <LockOpen className={classes.icon} />
              <Field
                noviError={password}
                label="Password"
                name="password"
                component={PasswordInput}
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              alignItems="center"
              justify="center"
              style={{ marginBottom: "4rem" }}
            >
              <Button type="submit" className={classes.button}>
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
        {width === "xs" || width === "sm" ? null : (
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={2}
            justify="center"
            alignItems="center"
          >
            <div className="vl">
              <span className="vl-innertext">or</span>
            </div>
          </Grid>
        )}
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={5}
          justify="center"
          alignItems="center"
        >
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Typography className={classes.text}>Login sa Google</Typography>

            <Button
              component={props => (
                <GoogleLogin
                  clientId="989499826115-33877k98pvaag2ouvl38ahc04cqj76d0.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  {...props}
                />
              )}
              className={classes.button}
            >
              Google
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  errorNode: state.errorNode.errorNode,
  loginState: state.login
});

const mapDispatchToProps = {
  login,
  loginGoogle
};

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "login" })(withWidth()(withStyles(styles)(Login))));

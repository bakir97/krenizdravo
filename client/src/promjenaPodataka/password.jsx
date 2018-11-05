import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import PasswordInput from "../inputi/PasswordInput";
import { Grid } from "@material-ui/core";
import { promjenaPassworda, resetDugme } from "../akcije/promjenaPodataka";
import Dugme from "../inputi/dugmeResponse";
import SecretIcon from "@material-ui/icons/NoEncryptionOutlined";
import LockOpen from "@material-ui/icons/LockOpen";
import SecretInput from "../inputi/secretInput";
import withWidth from "@material-ui/core/withWidth";
import { combineValidators, isRequired, matchesField } from "revalidate";

const validate = combineValidators({
  noviPassword: isRequired({ message: "Molim upisi password" }),
  secret: isRequired({ message: "Molim upisi secret" }),

  password1: matchesField("noviPassword")({
    message: "Passwords do not match"
  })
});
export class Password extends Component {
  state = {
    loading: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ loading: false });
    }

    if (nextProps.dugmeError) {
      this.setState({ loading: false });
    }

    console.log("propsss");
  }
  submit = podaci => {
    this.props.resetDugme();
    this.props.promjenaPassworda(podaci);
    this.setState({ loading: true });
  };
  render() {
    console.log(this.props.width);

    console.log(this.props.dugmeError, "error");
    console.log(this.props.success, "success");
    console.log(this.state.loading, "loading");
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100vh" }}
      >
        <form
          style={
            this.props.width === ("xs" || "sm")
              ? { width: "80%" }
              : { width: "40%" }
          }
          onSubmit={this.props.handleSubmit(this.submit)}
        >
          <Grid container item style={{ marginBottom: "4rem" }}>
            <LockOpen
              style={{
                height: "100%",
                paddingTop: "2rem"
              }}
            />
            <Field
              label="Password"
              name="noviPassword"
              component={PasswordInput}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "4rem" }}>
            <LockOpen
              style={{
                height: "100%",
                paddingTop: "2rem"
              }}
            />
            <Field
              label="Confirm Password"
              name="password1"
              component={PasswordInput}
            />
          </Grid>
          <Grid item container style={{ marginBottom: "4rem" }}>
            <SecretIcon
              style={{
                height: "100%",
                paddingTop: "2rem"
              }}
            />
            <Field
              type="text"
              label="Secret"
              name="secret"
              noviError={this.props.errorNode.secret}
              component={SecretInput}
            />
          </Grid>
          <Grid item container justify="center">
            <Dugme
              dugmeError={this.props.dugmeError}
              success={this.props.success}
              loading={this.state.loading}
            />
          </Grid>
        </form>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.login.korisnik,
  errorNode: state.errorNode.errorNode,
  success: state.errorNode.success,
  dugmeError: state.errorNode.dugmeError
});

const mapDispatchToProps = {
  promjenaPassworda,
  resetDugme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "password", validate })(withWidth()(Password)));

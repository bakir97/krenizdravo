import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../inputi/textInput";
import { Grid } from "@material-ui/core";
import { promjenaUsername, resetDugme } from "../akcije/promjenaPodataka";
import Dugme from "../inputi/dugmeResponse";
export class Username extends Component {
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
    this.props.promjenaUsername(podaci);
    this.setState({ loading: true });
  };
  render() {
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
        <Grid item>
          <p>{`Trenuti username: ${this.props.loginState.username}`}</p>
          <form onSubmit={this.props.handleSubmit(this.submit)}>
            <Field
              noviError={this.props.errorNode.noviUsername}
              label="Novi Username"
              type="text"
              name="noviUsername"
              component={TextInput}
            />
            <Dugme
              dugmeError={this.props.dugmeError}
              success={this.props.success}
              loading={this.state.loading}
            />
          </form>
        </Grid>
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
  promjenaUsername,
  resetDugme
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "username" })(Username));

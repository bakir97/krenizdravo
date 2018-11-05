import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../inputi/textInput";
import { Grid, Button, Avatar } from "@material-ui/core";
import Dugme from "../inputi/dugmeResponse";
import { napraviProfil } from "../akcije/ProfilAkcija";
import SnakBar from "./snakBar";

export class Registracija extends Component {
  state = {
    open: false,
    loading: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => () => {
    this.setState({ open: false });
  };
  submit = podaci => {
    this.props.napraviProfil(podaci);
    console.log(podaci);
  };

  render() {
    return (
      <div>
        <Grid
          alignContent="center"
          container
          alignItems="center"
          justify="center"
          style={{ height: "100vh", paddingTop: 56 }}
        >
          {this.props.loginState.slika && (
            <Avatar
              style={{ width: "20rem", height: "20rem" }}
              src="http://res.cloudinary.com/dq9cwwrml/image/upload/v1535726427/ghimsijatcrwxpjwvtpa.png"
              alt="Profila"
            />
          )}
          <Button onClick={this.handleOpen}>Open Modal</Button>

          <form onSubmit={this.props.handleSubmit(this.submit)}>
            <Field
              type="text"
              name="Ime"
              label="Upisi Ime"
              component={TextInput}
            />
            <Field
              type="text"
              name="Prezime"
              label="Upisi Prezime"
              component={TextInput}
            />
            <Field
              type="text"
              name="Grad"
              label="Upisi Grad"
              component={TextInput}
            />
            <Field
              type="number"
              name="Godine"
              label="Upisi Godine"
              component={TextInput}
            />
            <Field
              type="text"
              name="Instagram"
              label="Upisi Instagram username"
              component={TextInput}
            />
            <Field
              type="text"
              name="Facebook"
              label="Upisi Facebook username"
              component={TextInput}
            />
            <Field
              type="text"
              name="Youtube"
              label="Upisi Youtube username"
              component={TextInput}
            />
            <Dugme
              dugmeError={this.props.dugmeError}
              success={this.props.success}
              loading={this.state.loading}
            />
          </form>
        </Grid>
        <SnakBar />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.login.korisnik,
  errorNode: state.errorNode.errorNode,
  success: state.errorNode.success,
  dugmeError: state.errorNode.dugmeError,
  initialValues: state.profil.dohvatiProfil
});

const mapDispatchToProps = { napraviProfil };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "registracija", enableReinitialize: true })(Registracija));

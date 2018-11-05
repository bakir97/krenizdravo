import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../inputi/textInput";
import Dugme from "../inputi/dugmeResponse";
import { napraviProfil } from "../akcije/ProfilAkcija";
import { Grid } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { DugmeCrveno } from "../layout/dugme";

const classes = {
  button: {
    background: "linear-gradient(to right, #ed213a, #93291e)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(221, 24, 24,.3)",
    fontSize: "1.5rem",
    textTransform: "capitalize"
  },
  // button: {
  //   margin: theme.spacing.unit
  // },
  // leftIcon: {
  //   marginRight: theme.spacing.unit
  // },
  rightIcon: {
    marginLeft: "0.5rem"
  },
  iconSmall: {
    fontSize: 20
  }
};
export class Registracija extends Component {
  state = {
    open: false,
    loading: false
  };
  submit = podaci => {
    this.props.napraviProfil(podaci);
    console.log(podaci);
  };
  render() {
    return (
      <Grid item xs={12}>
        <form
          style={{ textAlign: "center" }}
          onSubmit={this.props.handleSubmit(this.submit)}
        >
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
          <Grid container alignItems="center" justify="space-around">
            <Dugme
              dugmeError={this.props.dugmeError}
              success={this.props.success}
              loading={this.state.loading}
            />
            <DugmeCrveno
              akcija={this.props.handleOpen}
              text={
                <Fragment>
                  Delete <DeleteIcon style={classes.rightIcon} />
                </Fragment>
              }
            />
          </Grid>
        </form>{" "}
      </Grid>
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

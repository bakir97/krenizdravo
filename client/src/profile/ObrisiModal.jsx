import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Modal, Typography, Button } from "@material-ui/core";
import { obrisiProfil, dohvatiProfil } from "../akcije/ProfilAkcija";
import { combineValidators, isRequired } from "revalidate";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import SecretInput from "../inputi/secretInput";
import SecretIcon from "@material-ui/icons/NoEncryptionOutlined";
import { reduxForm, Field } from "redux-form";
import { promjenaPassworda } from "../akcije/promjenaPodataka";
import { obrisiObjavuAkcija } from "../akcije/objavaAkcije";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  slova: {
    fontSize: "2rem",
    textAlign: "center"
  },
  button: {
    background: "red",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255,0,0,.2)",
    fontSize: "1.5rem",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "red"
    }
  }
});
const validate = combineValidators({
  secret: isRequired({ message: "Molim upisi secret" })
});

export class ObrisiProfil extends Component {
  submit = podaci => {
    // this.props.resetDugme();
    // this.props.promjenaPassworda(podaci);
    // this.setState({ loading: true });
    if (this.props.obrisiObjavu) {
      console.log(this.props.id);

      this.props.obrisiObjavuAkcija(this.props.id);
    } else {
      this.props.obrisiProfil(podaci);
    }
  };
  render() {
    const {
      otvoren,
      handleClose,
      handleSubmit,
      errorNode,
      loginState,
      classes,
      obrisiObjavu
    } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={otvoren}
        onClose={handleClose}
      >
        <div
          className={classes.paper}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          }}
        >
          <Grid
            container
            alignItems="center"
            justify="center"
            alignContent="center"
          >
            <Typography className={classes.slova}>
              {" "}
              Jeste li sigurni da zelite obrisati profil, profil se ne moze
              vratiti{" "}
            </Typography>
            <form style={{ width: "80%" }} onSubmit={handleSubmit(this.submit)}>
              {obrisiObjavu ? null : (
                <Grid item container style={{ marginBottom: "4rem" }}>
                  {!loginState.googleId && (
                    <Fragment>
                      {" "}
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
                        noviError={errorNode.secret}
                        component={SecretInput}
                      />
                    </Fragment>
                  )}
                </Grid>
              )}
              <Grid item container justify="center">
                <Button type="submit" className={classes.button}>
                  Obrisi
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.login.korisnik,
  errorNode: state.errorNode.errorNode,
  success: state.errorNode.success,
  dugmeError: state.errorNode.dugmeError,
  profilState: state.profil.dohvatiProfil
});

const mapDispatchToProps = {
  promjenaPassworda,
  obrisiProfil,
  dohvatiProfil,
  obrisiObjavuAkcija
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ form: "Obrisi", validate })(
    withWidth()(withStyles(styles)(ObrisiProfil))
  )
);

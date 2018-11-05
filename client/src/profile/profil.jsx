import React, { Component } from "react";
import { connect } from "react-redux";

import { promjenaPassworda } from "../akcije/promjenaPodataka";

import withWidth from "@material-ui/core/withWidth";
import { Grid, Button, Avatar } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { obrisiProfil, dohvatiProfil } from "../akcije/ProfilAkcija";
import { ObrisiModal } from "../CodeSplliting/loaded";
import ProfilForma from "./ProfilForma";
import SnakBar from "./snakBar";
import Slika from "../slika/slika";

const styles = theme => ({
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
  },
  avatar: {
    width: "10rem",
    height: "10rem",
    margin: "0 auto"
  }
});

export class Password extends Component {
  state = {
    open: false,
    loading: false,
    openModal: false
  };
  componentDidMount() {
    if (Object.keys(this.props.profilState).length > 0) {
      console.log(this.props.profilState, "profilKomponent");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ loading: false });
    }
    console.log(this.props.profilState, "profil");

    if (nextProps.dugmeError) {
      this.setState({ loading: false });
    }

    console.log("propsss");
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleOpenModal = () => {
    this.setState({ openModal: true });
  };

  handleCloseModal = () => () => {
    this.setState({ openModal: false });
  };
  render() {
    const { open, openModal } = this.state;
    const { classes, loginState } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: "100%", marginTop: "7rem" }}
        alignContent="center"
      >
        <Slika open={openModal} handleClose={this.handleCloseModal} />

        <Grid item xs={12}>
          <Avatar
            className={classes.avatar}
            alt="Profilna Slika"
            src={loginState.slika}
          />
          <Button onClick={this.handleOpenModal}>Open Modal</Button>
        </Grid>
        <ProfilForma handleOpen={this.handleOpen} />
        {open && (
          <ObrisiModal
            otvoren={open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
          />
        )}

        <SnakBar />
      </Grid>
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
  dohvatiProfil
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(withStyles(styles)(Password)));

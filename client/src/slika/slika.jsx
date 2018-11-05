import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";

import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Modal, Typography } from "@material-ui/core";
import UploadSliku from "../objava/UploadSliku";
import { connect } from "react-redux";
import { slika } from "../akcije/LoginAkcija";

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
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class Slika extends Component {
  componentDidMount() {
    console.log(this.props.proba);
  }
  state = {
    name: "",
    file: null,
    progress: null,
    error: false
  };
  drop = async files => {
    console.log(files);
    this.setState({ name: files[0].name, file: files[0] });
  };
  submit = async () => {
    const slika = await UploadSliku(this.state.file);
    const podaci = {};
    podaci.profilna = slika;
    this.props.slika(podaci);
  };
  UploadSlike = async () => {
    const slika = await UploadSliku(this.state.file);

    this.props.prebaciSlikuObjava(slika);
  };
  render() {
    const { classes, open, handleClose, objava } = this.props;
    const errordugme = {
      background: "red",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      fontSize: "1.5rem",
      textTransform: "capitalize"
    };
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose()}
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
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              xs={12}
              style={{ paddingBottom: "1rem" }}
            >
              <Typography variant="title" id="modal-title">
                Text in a modal
              </Typography>
            </Grid>
            <Grid item container alignItems="center" justify="center" xs={12}>
              <Fragment>
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="center"
                  justify="center"
                />
                <Dropzone onDrop={this.drop}>Pokusaj upload files</Dropzone>
                <Grid
                  alignItems="center"
                  justify="center"
                  container
                  item
                  xs={12}
                  style={{ paddingTop: "1rem" }}
                >
                  <Button
                    className={classes.button}
                    style={this.state.error ? errordugme : null}
                    onClick={objava ? this.UploadSlike : this.submit}
                  >
                    Upload
                  </Button>
                </Grid>
              </Fragment>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {
  slika
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Slika));

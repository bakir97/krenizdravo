import React, { Component } from "react";
import { connect } from "react-redux";
import Objava from "../layout/objavaIzgled";
import { Grid, Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import {
  dohvatiObjave,
  omiljenaObjava,
  dohvatiOmiljeneObjave,
  objaveLoadingSpinner,
  traziObjave,
  resetObjave
} from "../akcije/objavaAkcije";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import SearchBar from "material-ui-search-bar";
const styles = theme => ({
  input: { fontSize: "2rem" },
  search: {
    width: "100%",
    maxWidth: "40rem",
    margin: "1rem",
    marginBottom: "2rem"
  }
});
export class Objave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      value: "",
      stranica: this.props.match.path
    };

    window.onscroll = () => {
      if (this.props.objaveError) {
        return;
      }
      if (this.props.objaveTrazi) {
        return;
      }
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (this.props.match.path === "/objave") {
          this.props.objaveLoadingSpinner();
          this.setState(prevState => ({ skip: prevState.skip + 6 }));
          this.props.dohvatiObjave(this.state.skip);
        }
      }
    };
  }

  componentDidMount() {
    if (this.props.match.path === "/objave") {
      return this.props.dohvatiObjave(this.state.skip);
    }
    if (this.props.match.path === "/omiljeneObjave") {
      return this.props.dohvatiOmiljeneObjave();
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.setState({ stranica: this.props.match.path });
    }

    if (prevProps.match.path !== this.props.match.path) {
      if (this.props.match.path === "/objave") {
        this.props.resetObjave();

        const podaci = {};
        podaci.trazi = this.state.value;
        return this.props.dohvatiObjave(this.state.skip, podaci);
      }
      if (this.props.match.path === "/omiljeneObjave") {
        this.props.resetObjave();
        return this.props.dohvatiOmiljeneObjave();
      }
    }
  }
  componentWillUnmount() {
    this.props.resetObjave();
  }
  prebaci = id => () => {
    this.props.history.push(`/objava/${id}`);
  };
  omiljena = id => {
    const podaci = {};
    podaci.objavaId = id;
    this.props.omiljenaObjava(podaci);
  };
  trazi = () => {
    const podaci = {};
    podaci.trazi = this.state.value;

    this.props.traziObjave(this.state.skip, podaci);
  };
  render() {
    const { objave, objaveError, objaveLoading, classes, history } = this.props;
    let traziKomponenta = null;
    if (this.state.stranica === "/objave") {
      traziKomponenta = (
        <SearchBar
          value={this.state.value}
          onChange={newValue => this.setState({ value: newValue })}
          onRequestSearch={this.trazi}
          classes={{ input: classes.input, root: classes.search }}
          onCancelSearch={() => this.setState({ value: "" })}
        />
      );
    }
    return (
      <div style={{ position: "relative" }}>
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ marginTop: "7rem" }}
        >
          {traziKomponenta}

          {objave.length > 0 &&
            objave.map(objave => (
              <Objava
                history={history}
                omiljena={this.omiljena}
                prebaci={this.prebaci}
                id={objave._id}
                key={objave._id}
                naslovnaSlika={objave.naslovSlika}
                text={objave.naslov}
                profilnaSlika={objave.korisnik.slika}
                username={objave.korisnik.username}
                omiljene={objave.omiljeneObjave}
                obrisi={this.obrisi}
                korisnikId={objave.korisnik._id}
              />
            ))}
          {objaveError && <Typography>Nema vise objava</Typography>}
          {objaveLoading && (
            <CircularProgress
              style={{
                marginBottom: "2rem",
                position: "absolute",
                bottom: "0%"
              }}
            />
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  objave: state.objave.objave,
  objaveError: state.errorNode.objaveError,
  objaveLoading: state.objave.objaveLoading,
  objaveTrazi: state.objave.trazi
});

const mapDispatchToProps = {
  dohvatiObjave,
  omiljenaObjava,
  dohvatiOmiljeneObjave,
  objaveLoadingSpinner,
  traziObjave,
  resetObjave
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Objave))
);

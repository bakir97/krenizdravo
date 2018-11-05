import React, { Component } from "react";
import { connect } from "react-redux";
import Objava from "../layout/mojeObjaveIzgled";
import { Grid } from "@material-ui/core";
import {
  dohvatiMojeObjave,
  omiljenaObjava,
  resetObjave
} from "../akcije/objavaAkcije";

export class MojeObjave extends Component {
  componentDidMount() {
    this.props.dohvatiMojeObjave();
  }
  prebaci = id => () => {
    console.log(id);
    this.props.history.push(`/mojeObjave/${id}`);
  };
  omiljena = id => async () => {
    console.log(id, "id");
    const podaci = {};
    podaci.objavaId = id;
    this.props.omiljenaObjava(podaci);
  };
  obrisi = id => () => {
    console.log(id);

    //  const podaci ={}
    //  podaci.id=id
  };
  componentWillUnmount() {
    this.props.resetObjave();
  }
  render() {
    const { objave, history } = this.props;
    console.log(objave);

    return (
      <div>
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ marginTop: "7rem" }}
        >
          {objave &&
            objave.map(objave => (
              <Objava
                history={history}
                obrisi={this.obrisi}
                omiljena={this.omiljena}
                prebaci={this.prebaci}
                id={objave._id}
                key={objave._id}
                naslovnaSlika={objave.naslovSlika}
                text={objave.naslov}
                profilnaSlika={objave.korisnik.slika}
                username={objave.korisnik.username}
                omiljene={objave.omiljeneObjave}
                korisnikId={objave.korisnik._id}
              />
            ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  objave: state.objave.objave
});

const mapDispatchToProps = {
  dohvatiMojeObjave,
  omiljenaObjava,
  resetObjave
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MojeObjave);

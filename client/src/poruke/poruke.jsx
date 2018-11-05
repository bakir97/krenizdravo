import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { dohvatiPoruke } from "../akcije/chatAkcije";
import PorukeIzgled from "../layout/poruke";
export class NeprocitanePoruke extends Component {
  componentDidMount() {
    this.props.dohvatiPoruke();
    console.log("monuttt");
  }
  prebaciNaKorisnika = korisnik => () => {
    this.props.history.push(`/chat/${korisnik}`);
  };
  render() {
    const { svePoruke, ja } = this.props;
    return (
      <div style={{ marginTop: "7rem" }}>
        {svePoruke.neprocitanePoruke.poruke.map(neprocitana => (
          <PorukeIzgled
            nijeProcitana={true}
            key={neprocitana.poruke[neprocitana.poruke.length - 1]._id}
            od={neprocitana.od}
            slika={neprocitana.slika}
            text={neprocitana.poruke[neprocitana.poruke.length - 1].poruka}
            datum={neprocitana.poruke[neprocitana.poruke.length - 1].datum}
            brojPoruka={neprocitana.poruke.length}
            prebaciNaKorisnika={this.prebaciNaKorisnika}
          />
        ))}
        {svePoruke.poruke.map(korisnik => (
          <Fragment key={korisnik._id}>
            {svePoruke.neprocitanePoruke.poruke.filter(
              poruke =>
                poruke.od ===
                korisnik.korisnici.filter(korisnik => korisnik !== ja)[0]
            ).length > 0 ? null : (
              <PorukeIzgled
                slika={korisnik.poruka[0].od.slika}
                datum={korisnik.poruka[0].datum}
                text={korisnik.poruka[0].poruka}
                od={korisnik.korisnici.filter(korisnik => korisnik !== ja)[0]}
                prebaciNaKorisnika={this.prebaciNaKorisnika}
              />
            )}
          </Fragment>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  svePoruke: state.chat,
  ja: state.login.korisnik.username
});

const mapDispatchToProps = {
  dohvatiPoruke
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeprocitanePoruke);

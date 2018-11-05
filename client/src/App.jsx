import React, { Component, Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "./Navbar/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Registracija from "./registracija/registracija";
import Login from "./login/login";
import Username from "./promjenaPodataka/username";
import Password from "./promjenaPodataka/password";
import Slika from "./slika/slika";
import Profil from "./profile/profil";
import { NapraviProfil, MojeObjave, Objave } from "./CodeSplliting/loaded";
import NovaObjava from "./objava/novaObjava";
import JednaObjava from "./objava/jednaObjava";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chat from "./chat/chat";
import jedanChat from "./chat/jedanChat";
import Poruke from "./poruke/poruke";
import PorukeIzgled from "./layout/poruke";

class App extends Component {
  render() {
    const { auth } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Navbar />
        {auth && (
          <Switch>
            <Route path="/proba" component={PorukeIzgled} />
            <Route path="/poruke" component={Poruke} />
            <Route path="/chat/:ime" component={jedanChat} />
            <Route path="/chat" component={Chat} />
            <Route path="/username" component={Username} />
            <Route path="/password" component={Password} />
            <Route path="/slika" component={Slika} />
            <Route path="/profil" component={Profil} />
            <Route path="/napraviProfil" component={NapraviProfil} />
            <Route path="/mojeObjave/:id" component={NovaObjava} />
            <Route path="/mojeObjave" component={MojeObjave} />
            <Route path="/omiljeneObjave" component={Objave} />
            <Route path="/novaObjava" component={NovaObjava} />
            <Route path="/objava/:id" component={JednaObjava} />
            <Route path="/objave" component={Objave} />
            <Route path="/" exact render={() => <Redirect to="/objave" />} />
          </Switch>
        )}
        {!auth && (
          <Switch>
            <Route path="/username" component={Username} />
            <Route path="/password" component={Password} />
            <Route path="/registracija" component={Registracija} />
            <Route path="/login" component={Login} />
            <Route path="/objava/:id" component={JednaObjava} />
            <Route path="/objave" component={Objave} />
            <Route path="/" exact render={() => <Redirect to="/objave" />} />
          </Switch>
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.login.isAuth
});

const mapDispatchToProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

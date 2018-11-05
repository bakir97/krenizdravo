import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "react-quill/dist/quill.snow.css";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { postaviKorisnika } from "./akcije/LoginAkcija";
import { dohvatiProfil } from "./akcije/ProfilAkcija";
import { dohvatiNeprocitanePoruke } from "./akcije/chatAkcije";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "./store/configureStore";
import Sockets from "./socket/sockets";

const store = configureStore();
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const korisnik = jwt_decode(localStorage.jwtToken);
  store.dispatch(postaviKorisnika(korisnik));
  store.dispatch(dohvatiProfil());
  store.dispatch(dohvatiNeprocitanePoruke());

  Sockets(store, korisnik);
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();

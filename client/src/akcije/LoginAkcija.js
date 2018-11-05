import { ERROR, POSTAVI_KORISNIKA } from "./akcijeKonstante";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";
import { dohvatiProfil, logoutProfil } from "./ProfilAkcija";
export const login = (podaci, push) => async dispatch => {
  try {
    const profil = await axios.post(
      "https://instagramkopija.herokuapp.com/login",
      podaci
    );
    localStorage.setItem("jwtToken", profil.data.token);
    setAuthToken(profil.data.token);
    const korisnik = await jwt_decode(profil.data.token);
    dispatch(postaviKorisnika(korisnik));
    dispatch(dohvatiProfil());
    if (korisnik) {
      push("/objave");
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
  }
};
export const loginGoogle = (podaci, push) => async dispatch => {
  try {
    const profil = await axios.post(
      "https://instagramkopija.herokuapp.com/login/google",
      podaci
    );
    localStorage.setItem("jwtToken", profil.data.token);
    setAuthToken(profil.data.token);
    const korisnik = await jwt_decode(profil.data.token);
    dispatch(postaviKorisnika(korisnik));
    dispatch(dohvatiProfil());

    if (korisnik) {
      if (korisnik.google) {
        push("/username");
      } else {
        push("/objave");
      }
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
  }
};
export const postaviKorisnika = podaci => ({
  type: POSTAVI_KORISNIKA,
  payload: podaci
});
export const logout = push => dispatch => {
  dispatch(postaviKorisnika({}));
  setAuthToken(false);
  localStorage.removeItem("jwtToken");
  push("/login");
  dispatch(logoutProfil());
};
export const slika = (podaci, push) => async dispatch => {
  try {
    const slika = await axios.post(
      "https://instagramkopija.herokuapp.com/profilna",
      podaci
    );

    dispatch(postaviKorisnika(slika.data.korisnik));
    dispatch(dohvatiProfil());
    localStorage.setItem("jwtToken", slika.data.token);
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
  }
};

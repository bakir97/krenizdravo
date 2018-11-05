import axios from "axios";
import { POSTAVI_PROFIL } from "./akcijeKonstante";
export const napraviProfil = podaci => async dispatch => {
  try {
    const noviProfil = await axios.post(
      "https://instagramkopija.herokuapp.com/napraviProfil",
      podaci
    );
    dispatch({
      type: POSTAVI_PROFIL,
      payload: noviProfil.data
    });
    if (noviProfil) {
      dispatch(popUp(true));
    }
  } catch (error) {}
};
export const obrisiProfil = podaci => async dispatch => {
  try {
    const obrisiProfil = await axios.post(
      "https://instagramkopija.herokuapp.com/obrisiProfil",
      podaci
    );

    dispatch({
      type: POSTAVI_PROFIL,
      payload: obrisiProfil.data.prazno
    });
  } catch (error) {}
};
export const dohvatiProfil = () => async dispatch => {
  try {
    const dohvatiProfil = await axios.get(
      "https://instagramkopija.herokuapp.com/dohvatiProfil"
    );
    dispatch({
      type: POSTAVI_PROFIL,
      payload: dohvatiProfil.data
    });
  } catch (error) {
    dispatch({
      type: POSTAVI_PROFIL,
      payload: {}
    });
  }
};
export const logoutProfil = prazno => ({
  type: POSTAVI_PROFIL,
  payload: {}
});
export const popUp = podatak => ({
  type: "SUCCESS",
  payload: podatak
});

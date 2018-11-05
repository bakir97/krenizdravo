import { postaviKorisnika } from "./LoginAkcija";
import { ERROR } from "./akcijeKonstante";
import axios from "axios";
export const resetDugme = () => ({
  type: "RESET_DUGME"
});

export const promjenaUsername = podaci => async dispatch => {
  try {
    const promjenaUsername = await axios.post(
      "https://instagramkopija.herokuapp.com/promjenaPodataka/username",
      podaci
    );
    dispatch(postaviKorisnika(promjenaUsername.data));

    if (promjenaUsername) {
      dispatch({
        type: "SUCCESS"
      });
      dispatch({
        type: ERROR,
        payload: {}
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
    dispatch({
      type: "DUGME_ERROR"
    });
  }
};
export const promjenaPassworda = podaci => async dispatch => {
  try {
    const promjenaPassworda = await axios.post(
      "https://instagramkopija.herokuapp.com/promjenaPodataka/password",
      podaci
    );
    if (promjenaPassworda) {
      dispatch({
        type: "SUCCESS"
      });
      dispatch({
        type: ERROR,
        payload: {}
      });
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
    dispatch({
      type: "DUGME_ERROR"
    });
  }
};

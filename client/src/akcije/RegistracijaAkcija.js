import { ERROR } from "./akcijeKonstante";
import axios from "axios";
export const registracija = (podaci, push) => async dispatch => {
  try {
    const korisnik = await axios.post(
      "https://instagramkopija.herokuapp.com/registracija",
      podaci
    );
    if (korisnik) {
      push("/login");
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.response.data
    });
  }
};

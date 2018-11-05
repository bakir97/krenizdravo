import { POSTAVI_PROFIL } from "../akcije/akcijeKonstante";
const initialState = {
  dohvatiProfil: {},
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTAVI_PROFIL:
      return { ...state, dohvatiProfil: action.payload };
    case "SUCCESS":
      return { ...state, success: action.payload };
    default:
      return state;
  }
};

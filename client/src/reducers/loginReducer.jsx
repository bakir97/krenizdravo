import { POSTAVI_KORISNIKA } from "../akcije/akcijeKonstante";
const initialState = {
  isAuth: false,
  korisnik: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTAVI_KORISNIKA:
      let auth = false;
      if (
        Object.keys(action.payload) &&
        Object.keys(action.payload).length > 0
      ) {
        auth = true;
      }
      return { ...state, isAuth: auth, korisnik: action.payload };

    default:
      return state;
  }
};

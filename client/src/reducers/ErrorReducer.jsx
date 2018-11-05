import { ERROR } from "../akcije/akcijeKonstante";
const initialState = {
  errorNode: {},
  success: false,
  dugmeError: false,
  objaveError: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, errorNode: action.payload };
    case "SUCCESS":
      return { ...state, success: true };

    case "DUGME_ERROR":
      return { ...state, dugmeError: true };
    case "RESET_DUGME":
      return { ...state, dugmeError: false, success: false };
    case "OBJAVE_ERROR":
      return { ...state, objaveError: true };
    default:
      return state;
  }
};

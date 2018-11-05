import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import ErrorReducer from "./ErrorReducer";
import LoginReducer from "./loginReducer";
import ProfilReducer from "./profilReducer";
import ObjaveReducer from "./objaveReducer";
import chatReducer from "./chatReducer";

export default combineReducers({
  form: FormReducer,
  errorNode: ErrorReducer,
  login: LoginReducer,
  profil: ProfilReducer,
  objave: ObjaveReducer,
  chat: chatReducer
});

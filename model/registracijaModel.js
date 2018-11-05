const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Korisnik = new Schema({
  username: String,
  email: String,
  password: String,
  slika: {
    type: String,
    default: ""
  },
  googleId: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  neprocitanePoruke: [{ od: String, poruke: [{}], slika: String }],
  secret: String
});
mongoose.model("korisnik", Korisnik);

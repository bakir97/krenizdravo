const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profil = new Schema({
  korisnikId: {
    type: Schema.Types.ObjectId,
    ref: "korisnik"
  },
  username: String,
  Ime: String,
  Prezime: String,
  Grad: String,
  Godine: Number,
  Instagram: String,
  Facebook: String,
  Youtube: String,
  googleId: String
});
mongoose.model("profil", Profil);

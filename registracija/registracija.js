const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
router.post("/", async (req, res) => {
  const podaci = {};
  podaci.username = req.body.username;
  podaci.email = req.body.email;
  podaci.secret = req.body.secret;
  const korisnikUsername = await Korisnik.findOne({
    username: podaci.username
  });
  const error = {};
  if (korisnikUsername) {
    error.username = "username vec postoji";
  }
  const korisnikEmail = await Korisnik.findOne({ email: podaci.email });
  if (korisnikEmail) {
    error.email = "email vec postoji";
  }
  if (Object.keys(error).length > 0) {
    return res.status(400).json(error);
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  podaci.password = hash;

  const noviKorisnik = await new Korisnik(podaci);
  noviKorisnik.save();
  return res.json(noviKorisnik);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const keys = require("../config/keys");

const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
router.post("/", async (req, res) => {
  const korisnik = await Korisnik.findOne({ username: req.body.username });
  if (!korisnik) {
    return res.status(400).json({ username: "taj username ne postoji" });
  }
  const poduranje = await bcrypt.compare(req.body.password, korisnik.password);
  if (!poduranje) {
    return res.status(400).json({ password: "netacan password" });
  }
  const payload = {};
  payload.username = korisnik.username;
  payload.id = korisnik._id;
  payload.isAdmin = korisnik.isAdmin;
  payload.slika = korisnik.slika;
  payload.omiljeneObjave = korisnik.omiljeneObjave;

  return jsonwebtoken.sign(payload, "secret", (err, token) => {
    return res.json({
      token: "Bearer " + token,
      success: "true"
    });
  });
});
router.post("/google", async (req, res) => {
  const korisnik = await Korisnik.findOne({ googleId: req.body.googleId });
  if (korisnik) {
    const payload = {};
    payload.username = korisnik.username;
    payload.id = korisnik._id;
    payload.isAdmin = korisnik.isAdmin;
    payload.slika = korisnik.slika;
    payload.googleId = korisnik.googleId;
    payload.omiljeneObjave = korisnik.omiljeneObjave;

    return jsonwebtoken.sign(payload, "secret", (err, token) => {
      return res.json({
        token: "Bearer " + token,
        success: "true"
      });
    });
  }
  const podaci = {};
  podaci.username = req.body.googleId;
  podaci.slika = req.body.imageUrl;
  podaci.email = req.body.email;
  podaci.googleId = req.body.googleId;
  const noviKorisnik = await new Korisnik(podaci);
  noviKorisnik.save();

  const payload = {};
  payload.username = noviKorisnik.username;
  payload.id = noviKorisnik._id;
  payload.isAdmin = noviKorisnik.isAdmin;
  payload.slika = noviKorisnik.slika;
  payload.googleId = noviKorisnik.googleId;
  payload.omiljeneObjave = noviKorisnik.omiljeneObjave;

  payload.google = true;

  return jsonwebtoken.sign(payload, "secret", (err, token) => {
    return res.json({
      token: "Bearer " + token,
      success: "true"
    });
  });
});

module.exports = router;

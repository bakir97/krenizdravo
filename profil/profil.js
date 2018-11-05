const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Profil = mongoose.model("profil");
const Korisnik = mongoose.model("korisnik");
const jsonwebtoken = require("jsonwebtoken");

router.post(
  "/napraviProfil",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profil = await Profil.findOne({ korisnikId: req.user.id });
    if (profil) {
      const podaci = req.body;
      const update = await Profil.findOneAndUpdate(
        { korisnikId: req.user.id },
        { $set: podaci },
        { new: true }
      );
      update.save();
      return res.json(update);
    }
    const podaci = req.body;
    podaci.korisnikId = req.user.id;
    podaci.googleId = req.user.googleId;
    const noviProfil = await new Profil(podaci);
    noviProfil.save();
    return res.json(noviProfil);
  }
);
router.post(
  "/obrisiProfil",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profil = await Profil.findOne({ korisnikId: req.user.id });
    if (profil) {
      const korisnik = await Korisnik.findOne({ _id: req.user.id });

      if (korisnik.secret && korisnik.secret === req.body.secret) {
        const obrisiProfil = await Profil.findOneAndRemove({
          korisnikId: req.user.id
        });
        obrisiProfil.save();
        return res.json({ prazno: {} });
      }
      if (korisnik.googleId === req.user.googleId) {
        const obrisiProfil = await Profil.findOneAndRemove({
          korisnikId: req.user.id
        });
        obrisiProfil.save();
        return res.json({ prazno: {} });
      }
    }
    return res.status(400).json({ msg: "nema profila" });
  }
);
router.get(
  "/dohvatiProfil",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const profil = await Profil.findOne({ korisnikId: req.user.id });
    if (!profil) {
      return res.status(400).json({ msg: "nema profila" });
    }
    return res.json(profil);
  }
);
router.post(
  "/profilna",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const korisnik = await Korisnik.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { slika: req.body.profilna } },
      { new: true }
    );
    korisnik.save();
    if (korisnik) {
      const payload = {};
      payload.username = korisnik.username;
      payload.id = korisnik._id;
      payload.isAdmin = korisnik.isAdmin;
      payload.slika = korisnik.slika;
      if (korisnik.googleId) {
        payload.googleId = korisnik.googleId;
      }
      return jsonwebtoken.sign(payload, "secret", (err, token) => {
        return res.json({
          token: "Bearer " + token,
          success: "true",
          korisnik
        });
      });
    }
  }
);

module.exports = router;

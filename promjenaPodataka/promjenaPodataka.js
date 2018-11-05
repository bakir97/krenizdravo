const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

const Korisnik = mongoose.model("korisnik");
const bcryptjs = require("bcryptjs");
router.post(
  "/username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const provjeraUsername = await Korisnik.findOne({
      username: req.body.noviUsername
    });
    if (provjeraUsername) {
      return res.status(400).json({
        noviUsername: `nazalost ${req.body.noviUsername} vec postoji`
      });
    }
    const korisnik = await Korisnik.findOneAndUpdate(
      { _id: req.user.id },
      { $set: { username: req.body.noviUsername } },
      { new: true }
    );
    korisnik.save();
    res.json(korisnik);
  }
);
router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const korisnik = await Korisnik.findOne({ _id: req.user.id });
    if (!(korisnik.secret === req.body.secret)) {
      return res.status(400).json({ secret: "nazalost secret je netacan" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.noviPassword, salt);
    korisnik.password = hashedPassword;
    korisnik.save();
    res.json(korisnik);
  }
);
module.exports = router;

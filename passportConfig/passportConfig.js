const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;

const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");

const opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
module.exports = passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const korisnik = await Korisnik.findById(jwt_payload.id);
    if (korisnik) {
      return done(null, korisnik);
    }
    return done(null, false);
  })
);

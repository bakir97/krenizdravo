const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
const Chat = mongoose.model("chat");

router.get("/korisnici", async (req, res) => {
  const korisnici = await Korisnik.find({});
  return res.json(korisnici);
});
router.post(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const podaci = {
      poruka: { poruka: req.body.poruka, od: req.body.from, datum: Date.now() },

      korisnici: req.body.username.sort()
    };
    const chat = await Chat.findOne({ korisnici: podaci.korisnici });
    if (chat) {
      const update = [...[podaci.poruka], ...chat.poruka];

      chat.set({ poruka: update });
      await chat.save();
      const socketPoruka = {};
      socketPoruka._id = chat.poruka[0]._id;
      socketPoruka.poruka = chat.poruka[0].poruka;
      socketPoruka.datum = chat.poruka[0].datum;

      socketPoruka.od = req.user.username;
      socketPoruka.slika = req.body.slika;

      req.app.io.sockets
        .in(req.body.njegovUsername)
        .emit("proba", socketPoruka);
      req.app.io.sockets.in(req.user.username).emit("mojaPoruka", socketPoruka);

      res.json(socketPoruka);

      const korisnik = await Korisnik.findOne({
        username: req.body.njegovUsername
      });
      const jedanOd = korisnik.neprocitanePoruke.filter(
        poruka => poruka.od === req.user.username
      );
      if (jedanOd.length > 0) {
        const updatePoruke = jedanOd[0].poruke.concat({
          _id: socketPoruka._id,
          poruka: socketPoruka.poruka,
          datum: socketPoruka.datum
        });
        jedanOd[0].poruke = updatePoruke;
        const obrisi = korisnik.neprocitanePoruke.filter(
          poruka => poruka.od !== req.user.username
        );

        const novo = obrisi.concat(jedanOd);
        korisnik.set({ neprocitanePoruke: novo });
        korisnik.save();

        return;
      }
      const updatePoruke = korisnik.neprocitanePoruke.concat({
        od: socketPoruka.od,
        poruke: [
          {
            _id: socketPoruka._id,
            poruka: socketPoruka.poruka,
            datum: socketPoruka.datum
          }
        ],
        slika: socketPoruka.slika
      });
      korisnik.set({ neprocitanePoruke: updatePoruke });
      korisnik.save();

      return;
    }
    const noviChat = await new Chat(podaci);
    await noviChat.save();
    const socketPoruka = {};

    socketPoruka._id = noviChat.poruka[0]._id;
    socketPoruka.poruka = noviChat.poruka[0].poruka;
    socketPoruka.datum = noviChat.poruka[0].datum;

    socketPoruka.od = req.user.username;
    socketPoruka.slika = req.body.slika;

    return res.json(socketPoruka);
  }
);
router.post(
  "/chatovi/:slice",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const parami = parseInt(req.params.slice);

    const chat = await Chat.findOne({ korisnici: req.body.korisnici })
      .populate({
        path: "poruka.od",
        select: "username slika"
      })
      .slice("poruka", [parami, 10]);
    return res.json(chat.poruka);
  }
);
router.get(
  "/neprocitanePoruke",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Korisnik = mongoose.model("korisnik");
    korisnik = await Korisnik.findOne({ username: req.user.username });
    return res.json(korisnik.neprocitanePoruke);
  }
);
router.delete(
  "/resetneprocitanePoruke/:ime",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    korisnik = await Korisnik.findOne({ username: req.user.username });
    const bez = korisnik.neprocitanePoruke.filter(
      poruke => poruke.od !== req.params.ime
    );

    korisnik.set({ neprocitanePoruke: bez });
    korisnik.save();
    return res.json(korisnik.neprocitanePoruke);
  }
);
router.get(
  "/poruke",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    chat = await Chat.find({
      korisnici: { $in: [req.user.username] }
    })
      .populate("poruka.od", "username slika")
      .sort("-updatedAt");
    return res.json(chat);
  }
);
module.exports = router;

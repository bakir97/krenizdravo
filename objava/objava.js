const router = require("express").Router();
const passport = require("passport");
const Objava = require("mongoose").model("objava");
const Korisnik = require("mongoose").model("korisnik");

router.post(
  "/novaObjava",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const podaci = {};
    podaci.korisnik = req.user.id;
    podaci.naslov = req.body.naslov;
    podaci.objava = req.body.objava;
    podaci.naslovSlika = req.body.naslovSlika;

    const novaObjava = await new Objava(podaci);
    novaObjava.save();
    return res.json(novaObjava);
  }
);

router.get("/objave/:skip", async (req, res) => {
  const objave = await Objava.find()
    .skip(parseInt(req.params.skip))
    .limit(6)
    .populate("korisnik", ["username", "slika"])
    .sort("-createdAt");
  if (objave.length < 1) {
    res.status(404).json({ msg: "nema vise objava" });
  }
  return res.json(objave);
});
router.post("/objave/traziObjave", async (req, res) => {
  const objaveTrazi = await Objava.find({
    naslov: { $regex: ".*" + req.body.trazi + "*." }
  })
    .skip(parseInt(req.params.skip))
    .populate("korisnik", ["username", "slika"])
    .sort("-createdAt");

  if (objaveTrazi.length < 1) {
    return res.status(404).json({ msg: "nema vise objava" });
  }
  return res.json(objaveTrazi);
});
router.get(
  "/mojeObjave",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const objave = await Objava.find({ korisnik: req.user.id }).populate(
      "korisnik",
      ["username", "slika"]
    );
    if (!objave) {
      return res.status(404).json({ msg: "nema objava" });
    }
    return res.json(objave);
  }
);
router.get("/mojaObjava/:id", async (req, res) => {
  const objava = await Objava.findOne({ _id: req.params.id });
  if (!objava) {
    return res.status(404).json({ msg: "nema objave" });
  }
  return res.json(objava);
});
router.post(
  "/omiljeneObjave",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const objava = await Objava.findOne({ _id: req.body.objavaId });
    if (!objava) {
      return res.status(404).json({ msg: "nema objave" });
    }

    const korisnik = objava.omiljeneObjave.filter(
      objava => req.user.id == objava
    );

    if (korisnik.length > 0) {
      const obrisi = objava.omiljeneObjave.filter(
        objava => objava != req.user.id
      );
      const novaObjavaObrisi = await Objava.findOneAndUpdate(
        { _id: req.body.objavaId },
        { $set: { omiljeneObjave: obrisi } },
        { new: true }
      ).populate("korisnik", ["username", "slika"]);
      novaObjavaObrisi.save();
      return res.json(novaObjavaObrisi);
    }
    const noviArray = objava.omiljeneObjave.concat(req.user.id);
    const novaObjava = await Objava.findOneAndUpdate(
      { _id: req.body.objavaId },
      { $set: { omiljeneObjave: noviArray } },
      { new: true }
    ).populate("korisnik", ["username", "slika"]);
    novaObjava.save();
    return res.json(novaObjava);
  }
);
router.get(
  "/omiljeneObjave",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const objave = await Objava.find({ omiljeneObjave: req.user.id }).populate(
      "korisnik",
      ["username", "slika"]
    );
    return res.json(objave);
  }
);
router.delete(
  "/Objava/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const objave = await Objava.findOne({ _id: req.params.id });

    if (objave.korisnik != req.user.id) {
      return res.status(400).json({ msg: "ne moze poy" });
    }
    const objava = await Objava.findOneAndRemove({ _id: req.params.id });
    objava.save();
    return res.json(objava);
  }
);
router.get("/objava/:id", async (req, res) => {
  const objava = await Objava.findOne({ _id: req.params.id });
  if (!objava) {
    return res.status.json({ msg: "nema" });
  }
  return res.json(objava);
});

module.exports = router;

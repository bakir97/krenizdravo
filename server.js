const keys = require("./config/keys");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {});
const io = require("socket.io").listen(server);
app.io = io;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(keys.mongoURL);
require("./model/registracijaModel");
require("./model/profilModel");
require("./model/objavaModel");
require("./model/chat");
const passport = require("passport");
app.use(passport.initialize());
require("./passportConfig/passportConfig");
const Registracija = require("./registracija/registracija");
app.use("/registracija", Registracija);
const PromjenaPodataka = require("./promjenaPodataka/promjenaPodataka");
app.use("/promjenaPodataka", PromjenaPodataka);
const login = require("./login/login");
app.use("/login", login);
const Profil = require("./profil/profil");
app.use("/", Profil);
const Objava = require("./objava/objava");
app.use("/", Objava);
const chat = require("./chat/chat");
app.use("/", chat);
app.get("/", (req, res) => {
  res.send("aloo");
});
io.on("connection", socket => {
  socket.on("join", podatak => {
    socket.join(podatak.username);
  });

  // socket.on("novaPoruka", podatak => {
  //   io.sockets.in(podatak.njegovUsername).emit("porukaodservera", {
  //     poruka: podatak.poruka,
  //     od: { username: podatak.mojUsername, slika: podatak.slika }
  //   });
  // });
});

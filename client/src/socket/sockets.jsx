import socketIOClient from "socket.io-client";
import { dodajNeprocitanuPoruku } from "../akcije/chatAkcije";
const socket = socketIOClient("https://instagramkopija.herokuapp.com/");

export default (store, korisnik) => {
  socket.on("connect", () => {
    socket.emit("join", { username: korisnik.username });
  });

  console.log(window);
  socket.on("proba", async poruka => {
    await console.log(poruka, "probasocket");
    if (window.location.pathname !== `/chat/${poruka.od}`) {
      console.log(poruka, "index");
      store.dispatch(dodajNeprocitanuPoruku(poruka));
    } else {
      console.log("else");
      const novaPoruka = {
        _id: poruka._id,
        datum: poruka.datum,
        poruka: poruka.poruka,
        od: {
          slika: poruka.slika,
          username: poruka.od
        }
      };
      store.dispatch({
        type: "DODAJ_PORUKU",
        payload: novaPoruka
      });
    }
  });
  socket.on("mojaPoruka", async poruka => {
    const novaPoruka = {
      _id: poruka._id,
      poruka: poruka.poruka,
      od: {
        slika: poruka.slika,
        username: poruka.od
      },
      datum: poruka.datum
    };
    store.dispatch({
      type: "DODAJ_PORUKU",
      payload: novaPoruka
    });
  });
};

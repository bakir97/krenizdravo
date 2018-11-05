import openSocket from "socket.io-client";
const socket = openSocket("local");

function connect() {
  socket.on("chat", message => {});
}
function posalji(poruka) {
  socket.emit("novaPoruka", poruka);
}
function prihvati(pokusaj) {
  socket.on("vratiPoruku", poruka => pokusaj(poruka));
}
export { connect, posalji, prihvati };

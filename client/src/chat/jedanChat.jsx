import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";
import {
  dohvatiChat,
  dodajPoruku,
  resetPoruke,
  resetNeprocitanePoruke
} from "../akcije/chatAkcije";
import ChatIzgled from "../layout/chatIzgled";
import ChatInput from "../inputi/chatInput";
import { DugmeZeleno } from "../layout/dugme";
const socket = socketIOClient("https://instagramkopija.herokuapp.com/");

export class Chat extends Component {
  messagesEnd = React.createRef();
  proba = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      id: [],
      poruka: "",
      username: "",
      poruke: [],
      slice: 0,
      dno: true,
      podaci: {}
    };
    socket.on("komentar", poruka => {});
    socket.on("connect", () => {
      socket.emit("join", { username: this.props.korisnik.username });
    });
    socket.on("porukaodservera", poruka => {
      this.setState(prevState => ({
        poruke: prevState.poruke.concat(poruka.poruka)
      }));
    });
  }
  componentDidMount() {
    this.props.resetNeprocitanePoruke(this.props.match.params.ime);
    const podaci = {
      korisnici: [
        this.props.korisnik.username,
        this.props.match.params.ime
      ].sort()
    };
    this.setState({ podaci });
    this.props.dohvatiChat(podaci, this.state.slice);
    this.scrollToBottom("instant");
    window.onbeforeunload = () => {
      this.props.resetNeprocitanePoruke(this.props.match.params.ime);
    };
  }

  componentDidUpdate() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight ||
      this.state.dno
    ) {
      this.scrollToBottom("smooth");
    }
  }

  posalji = async e => {
    e.preventDefault();
    const podaci = {
      username: [this.props.match.params.ime, this.props.korisnik.username],
      poruka: this.state.poruka,
      from: this.props.korisnik.id,
      njegovUsername: this.props.match.params.ime,
      slika: this.props.korisnik.slika
    };
    socket.emit("novaPoruka", podaci);

    this.props.dodajPoruku(podaci);
    podaci.mojUsername = this.props.korisnik.username;
    this.setState({ poruka: "" });
  };
  componentWillUnmount() {
    this.props.resetPoruke();
  }

  scrollToBottom = nacin => {
    this.messagesEnd.current.scrollIntoView({ behavior: nacin });
  };
  starePoruke = () => {
    this.setState(prevState => ({ slice: prevState.slice + 10, dno: false }));
    this.props.dohvatiChat(this.state.podaci, this.state.slice);
  };
  render() {
    const { chat, korisnik } = this.props;
    return (
      <Fragment>
        <div ref={this.proba} style={{ marginTop: "7rem" }}>
          <div style={{ textAlign: "center" }}>
            <DugmeZeleno
              text="Loadmore"
              stajling={{ height: 0, borderRadius: 20 }}
              akcija={this.starePoruke}
            />
          </div>
          {chat &&
            chat.map((chat, i) => (
              <div key={i}>
                <ChatIzgled
                  text={chat.poruka}
                  slika={chat.od.slika}
                  od={chat.od.username}
                  datum={chat.datum}
                  ja={chat.od.username === korisnik.username}
                />
              </div>
            ))}

          <form
            style={{ textAlign: "center", margin: "2rem 0" }}
            onSubmit={this.posalji}
          >
            <ChatInput
              type="text"
              value={this.state.poruka}
              onChange={e => this.setState({ poruka: e.target.value })}
            />

            <DugmeZeleno
              text="posalji"
              stajling={{ height: 0, borderRadius: 20 }}
              type="submit"
            />
            <div ref={this.messagesEnd} />
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  korisnik: state.login.korisnik,
  chat: state.chat.chat,
  neprocitane: state.chat.neprocitanePoruke
});

const mapDispatchToProps = {
  dohvatiChat,
  dodajPoruku,
  resetPoruke,
  resetNeprocitanePoruke
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

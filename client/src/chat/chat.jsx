import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { List, ListItem, Avatar, ListItemText } from "@material-ui/core";

export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      korisnici: []
    };
  }

  async componentDidMount() {
    const korisnici = await axios.get(
      "https://instagramkopija.herokuapp.com/korisnici"
    );
    this.setState(prevState => ({ korisnici: korisnici.data }));
    console.log(korisnici.data);
  }

  render() {
    return (
      <List style={{ marginTop: "7rem" }}>
        {this.state.korisnici.map(korisnik => (
          <ListItem
            key={korisnik._id}
            dense
            button
            onClick={() =>
              this.props.history.push(`/chat/${korisnik.username}`)
            }
          >
            {korisnik.slika ? (
              <Avatar
                style={{ height: 80, width: 80 }}
                alt="Remy Sharp"
                src={korisnik.slika}
              />
            ) : (
              <Avatar style={{ height: 80, width: 80 }} alt="Remy Sharp">
                {korisnik.username.slice(0, 1)}
              </Avatar>
            )}

            <ListItemText
              primary={korisnik.username}
              style={{ fontSize: "2rem" }}
            />
          </ListItem>
        ))}
      </List>
    );
  }
}

const mapStateToProps = state => ({
  korisnik: state.login.korisnik
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Delete from "@material-ui/icons/Delete";
import { DugmeZeleno } from "./dugme";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Menu, MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import ObrisiModal from "../profile/ObrisiModal";
import Edit from "@material-ui/icons/Edit";

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: "0 auto"
  },
  slova: {
    fontSize: "2.5rem",
    textAlign: "center",
    background: "linear-gradient(to right,#45b649,#dce35b)",
    "-webkit-background-clip": "text",
    color: "transparent"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  title: {
    fontSize: "1.3rem",
    background: "linear-gradient(to right,#45b649,#dce35b)",
    "-webkit-background-clip": "text",
    color: "transparent"
  },
  paper: {
    paddingBottom: "0",
    paddingTop: "0"
  }
});

class RecipeReviewCard extends React.Component {
  state = { favorite: false, cekiranje: null, anchorEl: null, modal: false };
  obrnuto = id => () => {
    this.setState(prevState => ({ favorite: !prevState.favorite }));
    this.props.omiljena(id);
    console.log(this.state.favorite);
  };
  componentDidMount() {
    const cekiranje = this.props.omiljene.filter(
      omiljena => omiljena === this.props.loginState.id
    );
    if (cekiranje.length > 0) {
      this.setState({ favorite: true, cekiranje });
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = edit => {
    this.setState({ anchorEl: null });
    if (edit) {
      this.props.history.push(`/mojeObjave/${this.props.id}`);
    }
  };
  obrisi = id => () => {
    this.props.obrisi(id);
    this.handleClose();
  };
  otvoriModal = () => {
    this.setState({ modal: true });
    this.handleClose(false);
  };
  render() {
    const {
      classes,
      naslovnaSlika,
      text,
      profilnaSlika,
      username,
      prebaci,
      id,
      korisnikId,
      loginState
    } = this.props;
    const { anchorEl, modal } = this.state;

    return (
      <Grid item xs={12} style={{ marginBottom: "1rem", position: "relative" }}>
        <ObrisiModal
          id={id}
          obrisiObjavu={true}
          otvoren={modal}
          handleClose={() => this.setState({ modal: false })}
        />

        <Card className={classes.card}>
          <CardHeader
            classes={{ title: classes.title }}
            avatar={
              profilnaSlika ? (
                <Avatar
                  src={profilnaSlika}
                  className={classes.avatar}
                  alt="Profilna Slika"
                />
              ) : (
                <Avatar> {username.substring(0, 1)} </Avatar>
              )
            }
            title={`Author: ${username}`}
            action={
              korisnikId === loginState.id && (
                <IconButton
                  aria-owns={anchorEl ? "simple-menu" : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => this.handleClose(false)}
            MenuListProps={{ disablePadding: true }}
          >
            <Fragment>
              <MenuItem onClick={this.otvoriModal}>
                <Delete />
                Obrisi
              </MenuItem>
              <MenuItem onClick={() => this.handleClose(true)}>
                <Edit />
                Edit
              </MenuItem>
            </Fragment>
          </Menu>
          {naslovnaSlika && (
            <CardMedia className={classes.media} image={naslovnaSlika} />
          )}

          <CardContent>
            <Typography className={classes.slova} component="p">
              {text && text.length > 30 ? `${text.slice(0, 30)}...` : text}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <div style={{ flex: 1 }}>
              <IconButton
                onClick={this.obrnuto(id)}
                aria-label="Add to favorites"
              >
                {this.state.favorite ? (
                  <FavoriteIcon style={{ color: "red", fontSize: "3.5rem" }} />
                ) : (
                  <FavoriteIcon style={{ fontSize: "3.5rem" }} />
                )}
              </IconButton>
            </div>

            <DugmeZeleno
              text={"Read More"}
              akcija={prebaci(id)}
              aria-label="Share"
            />
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  loginState: state.login.korisnik
});

export default connect(mapStateToProps)(withStyles(styles)(RecipeReviewCard));

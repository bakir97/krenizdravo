import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { Link } from "react-router-dom";
import { logout } from "../akcije/LoginAkcija";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import classNames from "classnames";
import DrawerMoj from "./Drawer";
import Zdrav from "../slike/zdrav-zivot.png";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  flex: {
    flexGrow: 1,
    fontSize: 2 + "rem"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 10
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  velicina: { fontSize: 2 + "rem" },

  dugme: {
    textTransform: "capitalize",
    fontSize: 2 + "rem"
  },
  navbar: {
    background: "linear-gradient(to right,#45b649,#dce35b)",
    fontSize: 2 + "rem"
  },
  itemi: {
    // paddingBottom: "0",
    fontSize: "1.5rem"
  },
  avatar: {
    margin: 0
  },
  bigAvatar: {
    width: 50,
    height: 50
  },
  logo: {
    flexGrow: 1,
    margin: 0
  },
  proba: {
    "@media (min-width: 0px) and (orientation: landscape)": { minHeight: 56 }
  }
  // //   @media (min-width: 0px) and (orientation: landscape)
  // // <style>…</style>
  // // .MuiToolbar-regular-50 {
  // //     min-height: 48px;
  // }
});

class ButtonAppBar extends Component {
  state = {
    open: false,
    drawer: false
  };

  toggleDrawer = open => () => {
    this.setState({
      drawer: open
    });
  };
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  logout = e => {
    this.handleClose(e);
    this.props.logout(this.props.history.push);
  };
  render() {
    const { classes, loginState } = this.props;
    const { open } = this.state;
    let auth = null;
    if (loginState.isAuth) {
      auth = (
        <div>
          {this.props.neprocitane.brojporuka >= 1 ? (
            <IconButton
              component={props => <Link to="/poruke" {...props} />}
              aria-label="pending messages"
              className={classes.margin}
            >
              <Badge
                badgeContent={this.props.neprocitane.brojporuka}
                color="primary"
              >
                <MailIcon />
              </Badge>
            </IconButton>
          ) : (
            <IconButton
              component={props => <Link to="/poruke" {...props} />}
              aria-label="pending messages"
              className={classes.margin}
            >
              <MailIcon />
            </IconButton>
          )}

          <IconButton
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.avatar}
          >
            {loginState.korisnik.slika ? (
              <Avatar
                src={loginState.korisnik.slika}
                alt="Adelle Charles"
                // src={`${loginState.korisnik.slika}`}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            ) : (
              <Avatar> {loginState.korisnik.username.substring(0, 1)} </Avatar>
            )}
          </IconButton>
          <Popper
            style={{ marginTop: "1rem", marginRight: "1rem" }}
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem
                        component={props => <Link to="/profil" {...props} />}
                        className={classes.itemi}
                        onClick={this.handleClose}
                      >
                        Profil
                      </MenuItem>
                      <MenuItem
                        component={props => <Link to="/username" {...props} />}
                        className={classes.itemi}
                        onClick={this.handleClose}
                      >
                        Username
                      </MenuItem>
                      <MenuItem
                        component={props => <Link to="/password" {...props} />}
                        className={classes.itemi}
                        onClick={this.handleClose}
                      >
                        Password
                      </MenuItem>
                      <MenuItem className={classes.itemi} onClick={this.logout}>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      );
    } else {
      auth = (
        <Fragment>
          <Button
            className={classes.dugme}
            component={props => <Link to="/registracija" {...props} />}
            color="inherit"
          >
            Registracija
          </Button>
          <Button
            className={classes.dugme}
            component={props => <Link to="/login" {...props} />}
            color="inherit"
          >
            Login
          </Button>
        </Fragment>
      );
    }
    return (
      <div>
        <AppBar position="fixed" className={classes.navbar}>
          <Toolbar
            classes={{ regular: classes.proba }}
            className={classes.velicina}
          >
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={() => this.setState({ drawer: true })}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.flex}>
              <Avatar
                src={Zdrav}
                alt="Adelle Charles"
                // src={`${loginState.korisnik.slika}`}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
              <Typography style={{ display: "block", marginLeft: 5 }}>
                Zdrav Život
              </Typography>
            </div>
            {auth}
          </Toolbar>
        </AppBar>
        <DrawerMoj
          toggleDrawer={a => this.toggleDrawer(a)}
          otvoren={this.state.drawer}
        />
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  loginState: state.login,
  neprocitane: state.chat.neprocitanePoruke
});

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ButtonAppBar))
);

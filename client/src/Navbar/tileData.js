import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Favorite from "@material-ui/icons/Favorite";
import Web from "@material-ui/icons/Web";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

const styles = theme => ({
  slova: {
    fontSize: "3rem"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  boja: {
    color: "white"
  },
  root: {
    "&:focus": {
      outline: "none"
    }
  }
});

class NestedList extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, auth } = this.props;

    return (
      <div>
        <List component="nav" classes={{ root: classes.root }}>
          <ListItem
            onClick={this.props.toggleDrawer(false)}
            onKeyDown={this.props.toggleDrawer(false)}
            component={props => <Link to="/chat" {...props} />}
          >
            <ListItemIcon className={classes.boja}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset disableTypography>
              {" "}
              <Typography
                className={classes.boja}
                style={{ fontSize: "1.8rem" }}
              >
                {" "}
                Chat{" "}
              </Typography>{" "}
            </ListItemText>
          </ListItem>
          <ListItem
            onClick={this.props.toggleDrawer(false)}
            onKeyDown={this.props.toggleDrawer(false)}
            component={props => <Link to="/poruke" {...props} />}
          >
            <ListItemIcon className={classes.boja}>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset disableTypography>
              {" "}
              <Typography
                className={classes.boja}
                style={{ fontSize: "1.8rem" }}
              >
                {" "}
                Poruke{" "}
              </Typography>{" "}
            </ListItemText>
          </ListItem>

          <ListItem button onClick={this.handleClick}>
            <ListItemIcon className={classes.boja}>
              <Web />
            </ListItemIcon>
            <ListItemText disableTypography inset>
              <Typography
                className={classes.boja}
                style={{ fontSize: "1.8rem" }}
              >
                {" "}
                Objave{" "}
              </Typography>{" "}
            </ListItemText>{" "}
            {this.state.open ? (
              <ExpandLess className={classes.boja} />
            ) : (
              <ExpandMore className={classes.boja} />
            )}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                component={props => <Link to="/objave" {...props} />}
                onClick={this.props.toggleDrawer(false)}
                onKeyDown={this.props.toggleDrawer(false)}
                button
                className={classes.nested}
              >
                <ListItemIcon className={classes.boja}>
                  <Web />
                </ListItemIcon>
                <ListItemText disableTypography inset>
                  <Typography
                    className={classes.boja}
                    style={{ fontSize: "1.5rem" }}
                  >
                    {" "}
                    Sve Objave{" "}
                  </Typography>{" "}
                </ListItemText>
              </ListItem>
              {auth && (
                <Fragment>
                  {" "}
                  <ListItem
                    component={props => <Link to="/mojeObjave" {...props} />}
                    className={classes.nested}
                    onClick={this.props.toggleDrawer(false)}
                    onKeyDown={this.props.toggleDrawer(false)}
                    button
                  >
                    <ListItemIcon className={classes.boja}>
                      <Web />
                    </ListItemIcon>
                    <ListItemText inset disableTypography>
                      {" "}
                      <Typography
                        className={classes.boja}
                        style={{ fontSize: "1.5rem" }}
                      >
                        {" "}
                        Moje Objave{" "}
                      </Typography>{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    component={props => (
                      <Link to="/omiljeneObjave" {...props} />
                    )}
                    className={classes.nested}
                    onClick={this.props.toggleDrawer(false)}
                    onKeyDown={this.props.toggleDrawer(false)}
                    button
                  >
                    <ListItemIcon className={classes.boja}>
                      <Favorite />
                    </ListItemIcon>
                    <ListItemText inset disableTypography>
                      {" "}
                      <Typography
                        className={classes.boja}
                        style={{ fontSize: "1.5rem" }}
                      >
                        {" "}
                        Omiljene{" "}
                      </Typography>{" "}
                    </ListItemText>
                  </ListItem>
                  <ListItem
                    component={props => <Link to="/novaObjava" {...props} />}
                    className={classes.nested}
                    onClick={this.props.toggleDrawer(false)}
                    onKeyDown={this.props.toggleDrawer(false)}
                    button
                  >
                    <ListItemIcon className={classes.boja}>
                      <Favorite />
                    </ListItemIcon>
                    <ListItemText inset disableTypography>
                      {" "}
                      <Typography
                        className={classes.boja}
                        style={{ fontSize: "1.5rem" }}
                      >
                        {" "}
                        Nova Objava{" "}
                      </Typography>{" "}
                    </ListItemText>
                  </ListItem>
                </Fragment>
              )}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.login.isAuth
});

export default connect(mapStateToProps)(withStyles(styles)(NestedList));

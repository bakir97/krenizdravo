import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Lista from "./tileData";

const styles = {
  list: {
    background: "linear-gradient(to bottom,#45b649,#dce35b)"
  },
  fullList: {
    width: "auto"
  },
  root: {
    outline: "none"
  }
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    open: false
  };

  toggleDrawer = open => () => {
    this.setState({
      open
    });
  };

  render() {
    console.log(this.state.open);

    const { classes, otvoren, toggleDrawer } = this.props;

    return (
      <div className="alooo">
        <SwipeableDrawer
          open={otvoren}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          PaperProps={{ classes: { root: classes.list } }}
        >
          <div tabIndex={0} role="button" className="outline">
            <Lista toggleDrawer={a => toggleDrawer(a)} />
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(SwipeableTemporaryDrawer);

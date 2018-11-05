import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Avatar from "@material-ui/core/Avatar";
import { SpeedDial, BubbleList, BubbleListItem } from "react-speed-dial";

const App = () => {
  return (
    <MuiThemeProvider>
      <SpeedDial>
        <BubbleList>
          <BubbleListItem
            primaryText="Eric Hoffman"
            rightAvatar={<Avatar src="http://lorempixel.com/80/80" />}
          />
        </BubbleList>
      </SpeedDial>
    </MuiThemeProvider>
  );
};

App.displayName = "App";

export default App;

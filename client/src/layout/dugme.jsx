import React from "react";
import { Button } from "@material-ui/core";
const classes = {
  dugmeCrveno: {
    background: "linear-gradient(to right, #ed213a, #93291e)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(221, 24, 24,.3)",
    fontSize: "1.5rem",
    textTransform: "capitalize"
  },
  dugmeZeleno: {
    background: "linear-gradient(to right,#45b649,#dce35b)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(69, 182, 73,.3)",
    fontSize: "1.5rem",
    textTransform: "capitalize"
  }
};
export const DugmeCrveno = ({ text, akcija, type }) => {
  return (
    <Button
      type={type}
      variant="contained"
      onClick={akcija ? () => akcija() : null}
      style={classes.dugmeCrveno}
    >
      {text}
    </Button>
  );
};
export const DugmeZeleno = ({ text, akcija, type, stajling }) => {
  const styleMoj = { ...classes.dugmeZeleno, ...stajling };

  return (
    <Button
      variant="contained"
      onClick={akcija ? () => akcija() : null}
      style={styleMoj}
      type={type && type}
    >
      {text}
    </Button>
  );
};

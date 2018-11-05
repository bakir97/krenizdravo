import React from "react";
import { Grid, Typography, Avatar } from "@material-ui/core";
import TimeAgo from "react-timeago";

const chatIzgled = props => {
  return (
    <Grid container justify="center" style={{ padding: "1rem" }}>
      {props.ja ? (
        <Grid container item xs={12} alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justify="space-between"
            xs={12}
          >
            <Typography component="p" style={{ fontSize: "2rem" }}>
              <TimeAgo
                minPeriod={30}
                date={props.datum}
                style={{ fontSize: "1.4rem", marginRight: "1rem" }}
              />
            </Typography>
            {props.slika ? (
              <Avatar
                style={{ height: "5rem", width: "5rem" }}
                src={props.slika}
              />
            ) : (
              <Avatar
                style={{ fontSize: "2rem", height: "5rem", width: "5rem" }}
              >
                {props.od.slice(0, 1)}
              </Avatar>
            )}
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Typography
              component="p"
              style={{
                border: "1px solid",
                borderColor: "#dce35b",
                borderRadius: 20,
                marginTop: "0.5rem",
                padding: "1rem",
                fontSize: "1.6rem"
              }}
            >
              {props.text}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container item xs={12} alignItems="center">
          <Grid
            item
            container
            alignItems="center"
            justify="space-between"
            xs={12}
          >
            {props.slika ? (
              <Avatar
                style={{ height: "5rem", width: "5rem" }}
                src={props.slika}
              />
            ) : (
              <Avatar
                style={{ fontSize: "2rem", height: "5rem", width: "5rem" }}
              >
                {props.od.slice(0, 1)}
              </Avatar>
            )}
            <Typography component="p" style={{ fontSize: "2rem" }}>
              <TimeAgo
                minPeriod={30}
                date={props.datum}
                style={{ fontSize: "1.4rem", marginRight: "1rem" }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {" "}
            <Typography
              component="p"
              style={{
                border: "1px solid #dce35b",
                borderRadius: 20,
                marginTop: "0.5rem",
                marginRight: 7,
                padding: "1rem",
                fontSize: "1.6rem"
              }}
            >
              {props.text}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default chatIzgled;

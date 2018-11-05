import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { dohvatiObjavu } from "../akcije/objavaAkcije";
import withWidth from "@material-ui/core/withWidth";

export class JednaObjava extends Component {
  componentDidMount() {
    this.props.dohvatiObjavu(this.props.match.params.id);
    console.log(this.props.match.params.id);
  }
  render() {
    const { objava, width } = this.props;
    console.log(objava && objava.naslov.length);
    console.log(width);

    return (
      <Grid container justify="center" style={{ marginTop: "7rem" }}>
        {objava && (
          <Fragment>
            <Grid item xs={12}>
              <Typography variant="display3" style={{ textAlign: "center" }}>
                {(width === "xs" || width === "sm") &&
                objava.naslov.split(" ").filter(rijec => rijec.length > 22)
                  .length > 0
                  ? `${objava.naslov.slice(0, 22)}-  ${objava.naslov.slice(22)}`
                  : objava.naslov}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div
                className="halo"
                dangerouslySetInnerHTML={{ __html: objava.objava }}
              />
            </Grid>
          </Fragment>
        )}
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  objava: state.objave.objava
});

const mapDispatchToProps = { dohvatiObjavu };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withWidth()(JednaObjava));

import React, { Component } from "react";
import { Grid, Link, CircularProgress } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { PropTypes } from "prop-types";
import FinishedIcon from "@mui/icons-material/Stop";
import Model from "./Model";

const styles = theme => ({
  list: {
    listStyle: "none",
    padding: 0,
    width: "100%",
    "& li": {
      padding: theme.spacing(0.5)
    }
  },
  progress: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

class ConsistencyReportNavigation extends Component {
  showLink = (checking, model) => {
    const { classes } = this.props;
    if (checking) {
      return (
        <div className={classes.progress}>
          <Link color="textPrimary" variant="h6">
            {model.title}
          </Link>{" "}
          <CircularProgress size={30} thickness={5} />
        </div>
      );
    }
    return (
      <div className={classes.progress}>
        <Link href={"#" + model.id} color="textPrimary" variant="h6">
          {model.title}
        </Link>
        <FinishedIcon color="primary" fontSize="large" />
      </div>
    );
  };
  render() {
    const {
      checkingTechnical,
      checkingLegal,
      checkingAdapter,
      checkingClient,
      checkingOrganisation,
      doTechnical,
      doLegal,
      doAdapter,
      doClient,
      doOrganisation,
      classes
    } = this.props;
    return (
      <Grid container>
        <ul className={classes.list}>
          {doOrganisation && (
            <li>{this.showLink(checkingOrganisation, Model.ORG)}</li>
          )}
          {doAdapter && (
            <li> {this.showLink(checkingAdapter, Model.ADAPTER)}</li>
          )}
          {doClient && <li> {this.showLink(checkingClient, Model.CLIENT)}</li>}
          {doTechnical && (
            <li>{this.showLink(checkingTechnical, Model.TECH)}</li>
          )}
          {doLegal && <li>{this.showLink(checkingLegal, Model.LEGAL)}</li>}
        </ul>
      </Grid>
    );
  }
}

ConsistencyReportNavigation.propTypes = {
  checkingTechnical: PropTypes.bool.isRequired,
  checkingLegal: PropTypes.bool.isRequired,
  checkingAdapter: PropTypes.bool.isRequired,
  checkingClient: PropTypes.bool.isRequired,
  checkingOrganisation: PropTypes.bool.isRequired,
  doTechnical: PropTypes.bool.isRequired,
  doLegal: PropTypes.bool.isRequired,
  doAdapter: PropTypes.bool.isRequired,
  doClient: PropTypes.bool.isRequired,
  doOrganisation: PropTypes.bool.isRequired
};

export default withStyles(styles)(ConsistencyReportNavigation);

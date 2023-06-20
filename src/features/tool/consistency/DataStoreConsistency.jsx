import React, { Component } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Grid } from "@mui/material";
import { withStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import MaintanceApi from "../../../data/api/MaintanceApi";
import ConsistencyReportView from "./ConsistencyReportView";
import ConsistencyReportNavigation from "./ConsistencyReportNavigation";
import Model from "./Model";
import ToTopButton from "../../../common/ToTopButton";

const styles = theme => ({
  root: {
    width: "75%"
  },
  report: {
    width: "100%",
    "& pre": {
      padding: "12px"
    }
  }
});

class DataStoreConsistency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedTechical: false,
      checkedOrganisation: false,
      checkedAdapter: false,
      checkedClient: false,
      checkedLegal: false,
      organisationConsistency: {},
      technicalConsistency: {},
      adapterConsistency: {},
      clientConsistency: {},
      legalConsistency: {},
      checkingTechnical: false,
      checkingLegal: false,
      checkingAdapter: false,
      checkingClient: false,
      checkingOrganisation: false,
      intervalId: 0
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  isRunning = () => {
    return (
      this.state.checkingAdapter ||
      this.state.checkingClient ||
      this.state.checkingLegal ||
      this.state.checkingTechnical ||
      this.state.checkingOrganisation
    );
  };

  isSelected = () => {
    return (
      this.state.checkedTechical ||
      this.state.checkedOrganisation ||
      this.state.checkedAdapter ||
      this.state.checkedClient ||
      this.state.checkedLegal
    );
  };

  runConsistencyChecks = () => {
    this.setState({
      organisationConsistency: {},
      technicalConsistency: {},
      adapterConsistency: {},
      clientConsistency: {},
      legalConsistency: {}
    });
    if (this.state.checkedAdapter) {
      this.setState({ checkingAdapter: true });
      MaintanceApi.getAdapterConsistency().then(([response, json]) => {
        if (response.status === 200) {
          this.setState({ adapterConsistency: json });
          this.setState({ checkingAdapter: false });
        }
      });
    }
    if (this.state.checkedClient) {
      this.setState({ checkingClient: true });
      MaintanceApi.getClientConsistency().then(([response, json]) => {
        if (response.status === 200) {
          this.setState({ clientConsistency: json });
          this.setState({ checkingClient: false });
        }
      });
    }
    if (this.state.checkedLegal) {
      this.setState({ checkingLegal: true });
      MaintanceApi.getLegalConsistency().then(([response, json]) => {
        if (response.status === 200) {
          this.setState({ legalConsistency: json });
          this.setState({ checkingLegal: false });
        }
      });
    }
    if (this.state.checkedOrganisation) {
      this.setState({ checkingOrganisation: true });
      MaintanceApi.getOrganisationConsistency().then(([response, json]) => {
        if (response.status === 200) {
          this.setState({ organisationConsistency: json });
          this.setState({ checkingOrganisation: false });
        }
      });
    }
    if (this.state.checkedTechical) {
      this.setState({ checkingTechnical: true });
      MaintanceApi.getTechnicalConsistency().then(([response, json]) => {
        if (response.status === 200) {
          this.setState({ technicalConsistency: json });
          this.setState({ checkingTechnical: false });
        }
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ToTopButton />
        <Grid container direction="row" justifyContent="center">
          <Grid
            container
            direction="column"
            spacing={3}
            className={classes.root}
          >
            <Grid item>
              <Grid container direction="row" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedOrganisation}
                      value={this.state.checkedOrganisation}
                      onChange={this.handleChange}
                      name="checkedOrganisation"
                      color="default"
                    />
                  }
                  label="Organisasjon"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedAdapter}
                      value={this.state.checkedAdapter}
                      onChange={this.handleChange}
                      name="checkedAdapter"
                      color="default"
                    />
                  }
                  label="Adapter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedClient}
                      value={this.state.checkedClient}
                      onChange={this.handleChange}
                      name="checkedClient"
                      color="default"
                    />
                  }
                  label="Klienter"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedLegal}
                      value={this.state.checkedLegal}
                      onChange={this.handleChange}
                      name="checkedLegal"
                      color="default"
                    />
                  }
                  label="Juridisk kontakt"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkedTechical}
                      value={this.state.checkedTechical}
                      onChange={this.handleChange}
                      name="checkedTechical"
                      color="default"
                    />
                  }
                  label="Teknisk kontakt"
                />
              </Grid>
              <Grid item>
                <Grid container justifyContent="flex-end">
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.runConsistencyChecks}
                    disabled={this.isRunning() || !this.isSelected()}
                  >
                    Kjør
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Divider variant="fullWidth" />
            <Grid item>
              <Grid container justifyContent="center">
                <ConsistencyReportNavigation
                  doOrganisation={this.state.checkedOrganisation}
                  doTechnical={this.state.checkedTechical}
                  doLegal={this.state.checkedLegal}
                  doAdapter={this.state.checkedAdapter}
                  doClient={this.state.checkedClient}
                  checkingTechnical={this.state.checkingTechnical}
                  checkingLegal={this.state.checkingLegal}
                  checkingAdapter={this.state.checkingAdapter}
                  checkingClient={this.state.checkingClient}
                  checkingOrganisation={this.state.checkingOrganisation}
                />
              </Grid>

              {this.isSelected() && <Divider variant="fullWidth" />}

              <Grid container justifyContent="center">
                <ConsistencyReportView
                  data={this.state.organisationConsistency}
                  model={Model.ORG}
                />
                <ConsistencyReportView
                  data={this.state.adapterConsistency}
                  model={Model.ADAPTER}
                />
                <ConsistencyReportView
                  data={this.state.clientConsistency}
                  model={Model.CLIENT}
                />
                <ConsistencyReportView
                  data={this.state.legalConsistency}
                  model={Model.LEGAL}
                />
                <ConsistencyReportView
                  data={this.state.technicalConsistency}
                  model={Model.TECH}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(DataStoreConsistency);

import React, { Component } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Fab } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import OrganisationApi from "../../../data/api/OrganisationApi";
import DomainNameValidationInput from "../../../common/DomainNameValidationInput";


const styles = (theme) => ({
  createOrganisationButton: {
    margin: theme.spacing(1),
    top: theme.spacing(10),
    right: theme.spacing(3),
    position: "absolute"
  },
  dialogContent: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1)
  }
});

class OrganisationNew extends Component {


  constructor(props) {
    super(props);
    this.state = {
      organisation: {},
      open: false
    };
  }

  openCreateDialog = () => {
    this.setState({
      open: true
    });
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  updateOrganisationState = (event) => {

    const field = event.target.name;

    const organisation = this.state.organisation;
    organisation[field] = event.target.value;
    return this.setState({ organisation: organisation });
  };

  createOrganisation = () => {
    OrganisationApi.createOrganisation(this.state.organisation)
      .then(response => {
        if (response.status === 201) {
          this.props.notify("Organisasjonen ble opprettet");
        }
        else {
          this.props.notify("Organisasjonen finnes fra før");
        }
        this.setState({
          open: false,
          organisation: {}
        });
        this.props.onClose();
      });
  };

  nameIsValid = (valid) => {
    this.setState({ nameIsValid: valid });
  };

  isFormValid = () => {
    return (this.state.nameIsValid && this.state.organisation.displayName && this.state.organisation.orgNumber);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab onClick={() => this.openCreateDialog()} color="secondary" aria-label="add"
                className={classes.createOrganisationButton}>
          <AddIcon/>
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Kontakt</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <DomainNameValidationInput
              name="name"
              title="Domenenavn (f.eks. rfk.no)"
              required
              fullWidth
              onChange={this.updateOrganisationState}
              nameIsValid={this.nameIsValid}
            />
            <TextField
              name="displayName"
              label="Vist navn"
              required
              fullWidth
              onChange={this.updateOrganisationState}
            />
            <TextField
              name="orgNumber"
              label="Organisasjonsnummer"
              required
              fullWidth
              onChange={this.updateOrganisationState}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              Avbryt
            </Button>
            <Button disabled={!this.isFormValid()} onClick={() => this.createOrganisation()}
                    color="primary">
              Opprett
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

OrganisationNew.propTypes = {
  classes: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(OrganisationNew);

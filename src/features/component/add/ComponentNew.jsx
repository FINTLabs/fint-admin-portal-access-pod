import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Divider,
  Box,
  Fab,
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import AddIcon from "@mui/icons-material/Add";
import ComponentApi from "../../../data/api/ComponentApi";
import PropTypes from "prop-types";
import NameValidationInput from "../../../common/NameValidationInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

const styles = theme => ({
  createComponentButton: {
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

class ComponentNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      component: {
        /*
                openData: false,
                common: false,
                core: false,
                basePath: '',
                description: '',
                name: '',
                */
      },
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

  updateComponentState = event => {
    const field = event.target.name;

    const component = this.state.component;
    component[field] = event.target.value;
    return this.setState({ component: component });
  };

  updateComponentCheckBoxState = event => {
    const field = event.target.name;

    const component = this.state.component;
    component[field] = event.target.checked;
    return this.setState({ component: component });
  };

  createComponent = () => {
    ComponentApi.createComponent(this.state.component)
      .then(response => {
        if (response.status === 201) {
          this.props.notify("Komponenten ble opprettet");
        } else if (response.status === 302) {
          this.props.notify("Komponenten finnes fra før");
        } else {
          this.props.notify(
            "Det oppsto en feil ved opprettelse av komponenten."
          );
        }
        this.setState({
          open: false,
          component: {}
        });
        this.props.onClose();
      })
      .catch(() => {
        this.props.notify("Det oppsto en feil ved opprettelse av komponenten.");
      });
  };

  nameIsValid = valid => {
    this.setState({ nameIsValid: valid });
  };

  isFormValid = () => {
    const component = this.state.component;
    return (
      this.state.nameIsValid &&
      component.name &&
      component.description &&
      component.basePath
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          onClick={() => this.openCreateDialog()}
          color="secondary"
          aria-label="add"
          className={classes.createComponentButton}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Komponent</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <NameValidationInput
              name="name"
              title="Navn"
              required
              fullWidth
              onChange={this.updateComponentState}
              nameIsValid={this.nameIsValid}
            />

            <TextField
              name="description"
              label="Beskrivelse"
              required
              fullWidth
              onChange={this.updateComponentState}
            />
            <TextField
              name="basePath"
              label="Sti"
              required
              fullWidth
              onChange={this.updateComponentState}
            />

            <Box p={3} marginTop={6} borderRadius="5px" border={1} borderColor="grey.500">
              <Typography variant="subtitle1">Type</Typography>
              <Divider />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.component.openData}
                      onChange={this.updateComponentCheckBoxState}
                    />
                  }
                  name="openData"
                  label="Åpne data"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.component.common}
                      onChange={this.updateComponentCheckBoxState}
                    />
                  }
                  name="common"
                  label="Felles"
                />
                <FormControlLabel
                    control={
                      <Checkbox
                          checked={this.state.component.core}
                          onChange={this.updateComponentCheckBoxState}
                      />
                    }
                    name="core"
                    label="FINT kjernekomponent"
                />
              </FormGroup>

              <Typography variant="subtitle1">Miljøer</Typography>
              <Divider />
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.component.inProdcution}
                      onChange={this.updateComponentCheckBoxState}
                    />
                  }
                  name="inProduction"
                  label="Produksjon"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.component.inBeta}
                      onChange={this.updateComponentCheckBoxState}
                    />
                  }
                  name="inBeta"
                  label="Beta"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.component.inPlayWithFint}
                      onChange={this.updateComponentCheckBoxState}
                    />
                  }
                  name="inPlayWithFint"
                  label="Beta"
                />
              </FormGroup>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              Avbryt
            </Button>
            <Button
              disabled={!this.isFormValid()}
              onClick={() => this.createComponent()}
              color="primary"
            >
              Opprett
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ComponentNew.propTypes = {
  classes: PropTypes.any.isRequired,
  notify: PropTypes.any.isRequired,
  onClose: PropTypes.any.isRequired
};

export default withStyles(styles)(ComponentNew);

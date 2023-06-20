import React from "react";
import Button from "@mui/material/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,} from "@mui/material";
import PropTypes from "prop-types";
import WarningIcon from "@mui/icons-material/Warning";
import withStyles from '@mui/styles/withStyles';


const styles = (theme) => ({
  warningIcon: {
    color: theme.palette.primary.main,
    fontSize: '80px',
    float: 'left',
    marginRight: theme.spacing(2),
  },
  text: {}
});

class WarningMessageBox extends React.Component {
  handleClose = (result) => {
    this.setState({open: false});
    this.props.onClose(result);
  };

  constructor(props) {
    super(props);
    this.state = {
      open: props.show,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.show !== prevState.show) {
      return {
        open: nextProps.show,
      };
    }

    return null;
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Komponent"}</DialogTitle>
          <DialogContent className={classes.content}>
            <WarningIcon className={classes.warningIcon}/>
            <DialogContentText className={classes.text} id="alert-dialog-description">
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose(true)} color="primary" autoFocus>
              Ja
            </Button>
            <Button onClick={() => this.handleClose(false)} color="primary">
              Nei
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

WarningMessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default withStyles(styles)(WarningMessageBox);

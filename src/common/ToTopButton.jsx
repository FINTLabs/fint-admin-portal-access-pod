import React, { Component } from "react";
import { PropTypes } from "prop-types";
import ToTopIcon from "@mui/icons-material/ArrowUpward";
import { withStyles } from "@mui/styles";
import Fab from "@mui/material/Fab";

const styles = theme => ({
  toTop: {
    position: "fixed",
    bottom: "20px",
    right: "30px"
  }
});

class ToTopButton extends Component {
  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  };

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab
          color="primary"
          aria-label="ToTop"
          className={classes.toTop}
          onClick={() => this.scrollToTop()}
        >
          <ToTopIcon />
        </Fab>
      </div>
    );
  }
}

ToTopButton.defaultProps = {
  scrollStepInPx: 50,
  delayInMs: 5
};
ToTopButton.propTypes = {
  scrollStepInPx: PropTypes.number.isRequired,
  delayInMs: PropTypes.number.isRequired
};

export default withStyles(styles)(ToTopButton);

import React, { Component } from "react";
import JSONPretty from 'react-json-pretty';
import "react-json-pretty/themes/adventure_time.css";
import { withStyles } from "@mui/styles";
import _ from "lodash";

const styles = theme => ({
  root: {
    width: "100%"
    
  },
  report: {
    width: "100%",
    "& pre": {
      padding: "12px"
    }
  }
});

class ConsistencyReportView extends Component {
  render() {
    const { classes, data, model } = this.props;
    if (_.isEmpty(data)) {
        return (<div/>);
    }
    return (
      <div className={classes.root} id={model.id}>
        <h2>{model.title}</h2>
        <JSONPretty id="json-pretty" data={data} className={classes.report} />
      </div>
    );
  }
}

export default withStyles(styles)(ConsistencyReportView);

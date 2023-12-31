import React from "react";
import LoadingProgress from "../../common/LoadingProgress";
import ComponentList from "./ComponentList";
import ComponentNew from "./add/ComponentNew";
import {fetchComponents} from "../../data/redux/dispatchers/component";
import {bindActionCreators} from "redux";
import withStyles from '@mui/styles/withStyles';
import {connect} from "react-redux";
import {withContext} from "../../data/context/withContext";
import AutoHideNotification from "../../common/AutoHideNotification";
import Typography from "@mui/material/Typography";

const styles = () => ({
    root: {},
});


class ComponentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notify: false,
            notifyMessage: "",
        };
    }

    componentDidMount() {
        this.props.fetchComponents();
    }

    notify = (message) => {
        this.setState({
            notify: true,
            notifyMessage: message,
        });
    };

    onCloseNotification = () => {
        this.setState({
            notify: false,
            notifyMessage: '',
        });
    };

    onCloseComponentNew = () => {
        this.props.fetchComponents();
    };

    render() {
        if (this.props.components === undefined) {
            return <LoadingProgress/>;
        } else {
            // return this.renderPosts();
            const components = this.props.components && Array.isArray(this.props.components)
                ? [...this.props.components]
                : [];
            if(components.length > 0) {
                return this.renderPosts();
            } else {
                return (
                    <div>
                        <Typography>No components available</Typography>
                    </div>
                );
            }
        }
    }

    renderPosts() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AutoHideNotification
                    showNotification={this.state.notify}
                    message={this.state.notifyMessage}
                    onClose={this.onCloseNotification}
                />
                <ComponentNew
                    notify={this.notify}
                    onClose={this.onCloseComponentNew}
                />
                <ComponentList
                    notify={this.notify}
                    components={this.props.components}
                    fetchComponents={this.props.fetchComponents}
                />
            </div>
        );
    }
}

ComponentContainer.propTypes = {};

function mapStateToProps(state) {
    return {
        components: state.component.components,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchComponents: fetchComponents,
    }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(withContext(ComponentContainer)));

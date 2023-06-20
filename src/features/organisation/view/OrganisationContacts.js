import React, {Component} from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import ContactIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import Sort from "../../../common/utils/Sort";

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  organisationList: {
    width: '75%',
  },
  title: {
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(1)
  },
  listItem: {
    borderBottom: '1px dashed lightgray',
  },
  itemAvatar: {
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  removeIcon: {
    color: theme.palette.primary.light,
  },
});

class OrganisationContacts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: props.show,
      organisation: props.organisation,
      contacts: props.contacts,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return {
        open: nextProps.show,
        organisation: nextProps.organisation,
        contacts: nextProps.contacts,
      };
    }

    return null;
  }

  handleCancel = () => {
    this.props.onClose();
  };

  updateOrganisationState = (event) => {
    const field = event.target.name;

    const organisation = this.state.organisation;
    const contacts = this.state.contacts;
    organisation[field] = event.target.value;
    return this.setState({organisation: organisation, contacts: contacts});
  };

  organisationFilter = (contact) => {
    return this.state.organisation && this.state.organisation.techicalContacts && this.state.organisation.techicalContacts.includes(contact.dn);
  };

  renderDialog() {
    const {classes} = this.props;
    const organisation = this.state.organisation;
    const contacts = this.state.contacts;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Tekniske kontakter for {organisation?.displayName}</DialogTitle>
          <DialogContent>
            <List>
              {contacts.filter(this.organisationFilter).sort(Sort.alphabetically).map((contact) => 
                <ListItem className={classes.listItem} key={contact.dn}>
                  <ListItemAvatar>
                      <Avatar className={classes.itemAvatar}>
                          <ContactIcon/>
                      </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary={contact.firstName + " " +  contact.lastName}
                      secondary={contact.mail}
                  />
                </ListItem>,
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleCancel()} color="primary">
              Lukk
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  };

  render() {
    return this.renderDialog();
  };
}

OrganisationContacts.propTypes = {
  organisation: PropTypes.object,
  contacts: PropTypes.array.isRequired,
  onClose: PropTypes.any.isRequired,
  show: PropTypes.any.isRequired
};

export default withStyles(styles)(OrganisationContacts);

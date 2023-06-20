import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Checkbox} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

const EditAccessPackageDialog = (props) => {
    const {componentSelectorOpen, handleCloseComponentSelector, componentConfiguration, selectedAccessPackage, chooseComponent} = props;
    return (
        <Dialog
            open={componentSelectorOpen}
            onClose={handleCloseComponentSelector}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Legg til komponenter"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Velg komponenter til pakken
                </DialogContentText>
                <List component="nav" aria-label="Komponentlist" dense>
                    {componentConfiguration.map(componentConfig => {
                        return (
                            <ListItem key={componentConfig.name}>
                                <ListItemText primary={componentConfig.name}/>
                                <Checkbox
                                    checked={selectedAccessPackage ? selectedAccessPackage.components.includes(componentConfig.dn) : false}
                                    onChange={() => chooseComponent(componentConfig)}/>
                            </ListItem>);
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseComponentSelector} color="primary">
                    Ferdig
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditAccessPackageDialog;
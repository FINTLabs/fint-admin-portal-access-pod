import React from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar/AppBar";

const EditAccessPackageAppBar = (props) => {
    const {classes, handleClose, handleSaveAccess, selectedAccessPackage} = props;
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={() => handleClose(true)}
                    aria-label="close"
                    size="large">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {selectedAccessPackage.name}
                </Typography>
                <Button autoFocus color="inherit" onClick={() => handleSaveAccess(selectedAccessPackage)}>
                    Lagre
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default EditAccessPackageAppBar;
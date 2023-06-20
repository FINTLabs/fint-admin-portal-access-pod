import React, {useState} from "react";
import {Fab} from "@mui/material";
import {Add} from "@mui/icons-material";
import makeStyles from '@mui/styles/makeStyles';
import {useSelector} from "react-redux";
import AddAccessPackageForm from "./TemplateForm";

const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: theme.spacing(1),
        top: theme.spacing(10),
        right: theme.spacing(3),
        position: "absolute"
    }
}));

const AddAccessPackage = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const accessTemplates = useSelector(state => state.accessTemplate.access_templates);
    const [valid, setValid] = useState(false);

    function openAddDialog() {
        setOpen(true);
    }

    function closeAddAccessPackage() {
        setOpen(false);
    }

    function packageNameIsValid(event) {
        setValid(event);
    }

    return (
        <div>
            <Fab
                color="secondary"
                className={classes.addButton}
                onClick={openAddDialog}
            >
                <Add/>
            </Fab>
            <AddAccessPackageForm
                closeAddAccessPackage={closeAddAccessPackage}
                packageNameIsValid={packageNameIsValid}
                packages={accessTemplates}
                valid={valid}
                open={open}
                setOpen={setOpen}/>
        </div>
    );
};

export default AddAccessPackage;

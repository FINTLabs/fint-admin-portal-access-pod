import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import AccessTemplateApi from "../../../data/api/AccessTemplateApi";
import {fetchAccessTemplates} from "../../../data/redux/dispatchers/access_template";
import PackageIdValidationInput from "../../../common/input-validation/PackageIdValidationInput";

const AddAccessPackageForm = (props) => {
    const {closeAddAccessPackage, packageNameIsValid, packages, valid, open, setOpen} = props;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    function updateName(name) {
        setName(name);
    }

    function updateDescription(event) {
        setDescription(event.target.value);
    }

    function handleCreatePackage() {
        const access = {};
        access.name = name;
        access.description = description;
        AccessTemplateApi.createAccessTemplates(access)
            .then(response => {
                if (response.status === 201) {
                    setOpen(false);
                    dispatch(fetchAccessTemplates());
                }
            });
    }

    return (
        <Dialog
            open={open}
            onClose={closeAddAccessPackage}
            aria-labelledby="form-dialog-title"
            maxWidth="md"
        >
            <DialogTitle id="form-dialog-title">Ny tilgangspakke</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Vennligst fyll ut de obligatoriske feltene for å legge til ny
                    tilgangspakke.
                </DialogContentText>
                <PackageIdValidationInput
                    title="Navn"
                    name="name"
                    value={name}
                    onChange={updateName}
                    packageNameIsValid={packageNameIsValid}
                    packages={packages}
                />
                <TextField
                    name="description"
                    label="Beskrivelse"
                    required
                    fullWidth
                    value={description}
                    onChange={updateDescription}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={closeAddAccessPackage}
                    variant="contained"
                    color="primary"
                >
                    Avbryt
                </Button>
                <Button
                    disabled={!valid}
                    onClick={handleCreatePackage}
                    variant="contained"
                    color="primary"
                >
                    Legg til
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAccessPackageForm;
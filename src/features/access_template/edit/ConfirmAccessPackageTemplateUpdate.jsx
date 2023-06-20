import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import ChangedAccesses from "./ChangedAccesses";
import ChangedComponents from "./ChangedComponents";
import AccessTemplateApi from "../../../data/api/AccessTemplateApi";
import {fetchAccessTemplates} from "../../../data/redux/dispatchers/access_template";

const ConfirmAccessPackageUpdate = (props) => {
    const {open, handleClose, setEditOpen, setSnackBarOpen, setSnackBarMessage} = props;
    const oldAccessPackage = useSelector(state => state.accessTemplate.selectedAccessPackageBeforeEdit);
    const accessTemplates = useSelector(state => state.accessTemplate.access_templates);
    const selectedForEditingId = useSelector(state => state.accessTemplate.selectedForEditing);
    const dispatch = useDispatch();

    let selectedAccessPackage = undefined;
    accessTemplates.map(ap => {
        if (ap.dn === selectedForEditingId) {
            selectedAccessPackage = ap;
        }
        return ap;
    });

    function handleSave() {
        AccessTemplateApi.updateAccessTemplates(selectedAccessPackage)
            .then(response => {
                if (response.status === 200) {
                    setEditOpen(false);
                    dispatch(fetchAccessTemplates());
                    setSnackBarMessage(selectedAccessPackage.name + " lagret");
                    setSnackBarOpen(true);
                    handleClose();
                } else {
                    setEditOpen(false);
                    dispatch(fetchAccessTemplates());
                    setSnackBarMessage("Noe gikk galt: " + response.status + " " + response.statusText);
                    setSnackBarOpen(true);
                    handleClose();
                }
            });
    }

        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> Følgende endringer blir utført
                    på {selectedAccessPackage.name}</DialogTitle>
                <DialogContent>
                    {<ChangedComponents oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                    {<ChangedAccesses oldAccessPackage={oldAccessPackage} newAccessPackage={selectedAccessPackage}/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant={"contained"}>
                        Tilbake
                    </Button>
                    <Button onClick={handleSave} color="primary" autoFocus variant={"contained"}>
                        Lagre
                    </Button>
                </DialogActions>
            </Dialog>
        );
};

export default ConfirmAccessPackageUpdate;

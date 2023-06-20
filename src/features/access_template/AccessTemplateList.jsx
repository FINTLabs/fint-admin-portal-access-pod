import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAccessTemplates} from "../../data/redux/dispatchers/access_template";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import WarningMessageBox from "../../common/WarningMessageBox";
import makeStyles from '@mui/styles/makeStyles';
import AccessPackageListItem from "./AccessPackageTemplateListItem";
import AccessTemplateApi from "../../data/api/AccessTemplateApi";
import SavedSuccessSnackbar from "../../common/SavedSuccessSnackbar";
import EditAccessPackageContainer from "./edit/EditAccessPackageTemplateContainer";
import {setAccessPackageBeforeChanges, setSelectedForEditingPackage} from "../../data/redux/actions/access_templates";
import {fetchComponents} from "../../data/redux/dispatchers/component";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    componentList: {
        width: "75%"
    },
    title: {
        paddingLeft: theme.spacing(3),
        paddingBottom: theme.spacing(1)
    },
    listItem: {
        borderBottom: "1px dashed lightgray"
    },
    itemAvatar: {
        color: "#fff",
        backgroundColor: theme.palette.secondary.main
    },
    dialogButtons: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        alignSelf: "center"
    },
    buttonDeleteAccessPackage: {
        margin: theme.spacing(1),
        color: "#FFF",
        backgroundColor: theme.palette.primary.dark,
    },
    buttonDontDeleteAccessPackage: {
        margin: theme.spacing(1),
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column"
    }
}));

const AccessTemplateList = () => {
        const classes = useStyles();
        const dispatch = useDispatch();
        const accessTemplates = useSelector(state => state.accessTemplate.access_templates);
        const oldAccessPackage = useSelector(state => state.accessTemplate.selectedAccessPackageBeforeEdit);
        const selectedForEditingId = useSelector(state => state.accessTemplate.selectedForEditing);
        const [editOpen, setEditOpen] = useState(false);
        const [openSave, setOpenSave] = useState(false);
        const [openDialog, setOpenDialog] = React.useState(false);
        const [packageToDelete, setPackageToDelete] = React.useState(null);
        const [snackBarOpen, setSnackBarOpen] = useState(false);
        const [snackBarMessage, setSnackBarMessage] = React.useState("");
        const _ = require('lodash');
        const deleteMessageText = packageToDelete != null ? "Vil du fjerne tilgangspakken " + packageToDelete.name + "?" : "";

        useEffect(() => {
                dispatch(fetchComponents());
            }, [dispatch]
        );

        let selectedAccessPackage = undefined;
        accessTemplates.map(ap => {
            if (ap.dn === selectedForEditingId) {
                selectedAccessPackage = ap;
            }
            return ap;
        });

        const handleSnackBarClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            setSnackBarOpen(false);
        };

        function deleteAccessPackageTemplate(accessPackage) {
            console.log("accessPackage: ", accessPackage);
            AccessTemplateApi.deleteAccessTemplates(accessPackage).then(r => {
                if (r.status === 202) {
                    console.log(r.status + " SUCSESS");
                    setSnackBarMessage(accessPackage.name + " slettet");
                    setSnackBarOpen(true);
                } else {
                    console.log(r.status + " FAIL");
                    setSnackBarMessage("Noe gikk galt: " + r.status + " " + r.statusText);
                    setSnackBarOpen(true);
                }
                    dispatch(fetchAccessTemplates());
            });
        }

        function handleEditClose() {
            setEditOpen(false);
            dispatch(fetchAccessTemplates());
        }

        function handleSaveClose() {
            setOpenSave(false);
        }

        function openEdit(dn, accessPackage) {

            const newPackage = {};
            newPackage.collection = [...accessPackage.collection];
            newPackage.read = [...accessPackage.read];
            newPackage.modify = [...accessPackage.modify];
            newPackage.components = [...accessPackage.components];
            newPackage.name = accessPackage.name;
            newPackage.description = accessPackage.description;
            newPackage.dn = accessPackage.dn;
            newPackage.self = accessPackage.self;

            setEditOpen(true);
            dispatch(setSelectedForEditingPackage(dn));
            dispatch(setAccessPackageBeforeChanges(newPackage));
        }

        function handleClose(confirmed) {
            if (confirmed === true) {
                deleteAccessPackageTemplate(packageToDelete);

            }
            setOpenDialog(false);
        }

        function openDeleteAccessPackageDialog(accessPackage) {
            setPackageToDelete(accessPackage);
            setOpenDialog(true);
        }

function handleSaveAccess() {
    if (!_.isEqual(oldAccessPackage, selectedAccessPackage)) {
        setOpenSave(!openSave);
    } else {
        handleEditClose();
    }
}


        if (accessTemplates) {
            return (
                <div>
                    <div className={classes.root}>
                        <div className={classes.componentList}>
                            <Typography variant="h5" className={classes.title}>
                                Tilgangspakker (maler)
                            </Typography>
                            <Divider/>
                            <List>
                                {accessTemplates.map(accessPackage => (
                                    <AccessPackageListItem
                                        key={accessPackage.dn}
                                        classes={classes}
                                        accessPackage={accessPackage}
                                        openEdit={openEdit}
                                        openDeleteAccessPackageDialog={openDeleteAccessPackageDialog}
                                    />
                                ))
                                }
                            </List>
                            <EditAccessPackageContainer open={editOpen} handleClose={handleEditClose}
                                                        handleSaveAccess={handleSaveAccess} setEditOpen={setEditOpen}
                                                        openSave={openSave} handleSaveClose={handleSaveClose}
                                                        setSnackBarOpen={setSnackBarOpen}
                                                        setSnackBarMessage={setSnackBarMessage}
                            />
                        </div>
                        <WarningMessageBox
                            show={openDialog}
                            onClose={handleClose}
                            message={deleteMessageText}
                            title={"Fjerne tilgangspakke"}
                        />
                        <SavedSuccessSnackbar open={snackBarOpen} close={handleSnackBarClose}
                                              message={snackBarMessage}/>
                    </div>
                </div>
            );
        } else {
            return (<></>);
        }
    }
;

export default AccessTemplateList;

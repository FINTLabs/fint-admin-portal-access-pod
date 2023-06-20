import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import ContactIcon from "@mui/icons-material/Person";
import ComponentIcon from "@mui/icons-material/WebAsset";
import AccessIcon from "@mui/icons-material/LockOpen";
import ToolsIcon from "@mui/icons-material/Build";
import {Link} from "react-router-dom";
import List from "@mui/material/List";

const MenuItems = () => {
    return (
        <List id="menuList">
            <ListItem button component={Link} to="/">
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button component={Link} to="/organisations">
                <ListItemIcon>
                    <BusinessIcon/>
                </ListItemIcon>
                <ListItemText primary="Organisasjoner"/>
            </ListItem>
            <ListItem button component={Link} to="/contacts">
                <ListItemIcon>
                    <ContactIcon/>
                </ListItemIcon>
                <ListItemText primary="Kontakter"/>
            </ListItem>
            <ListItem button component={Link} to="/components">
                <ListItemIcon>
                    <ComponentIcon/>
                </ListItemIcon>
                <ListItemText primary="Komponenter"/>
            </ListItem>
            <ListItem button component={Link} to="/access">
                <ListItemIcon>
                    <AccessIcon/>
                </ListItemIcon>
                <ListItemText primary="Tilgangspakker"/>
            </ListItem>
            <ListItem button component={Link} to="/tools">
                <ListItemIcon>
                    <ToolsIcon/>
                </ListItemIcon>
                <ListItemText primary="Verktøy"/>
            </ListItem>
        </List>
    );
}

export default MenuItems;

import React from "react";
import {Route} from "react-router-dom";
import Dashboard from "../../features/dashboard/Dashboard";
import OrganisationContainer from "../../features/organisation/OrganisationContainer";
import ContactContainer from "../../features/contact/ContactContainer";
import ComponentContainer from "../../features/component/ComponentContainer";
import ToolContainer from "../../features/tool/ToolContainer";
import AccessPackageTemplateContainer from "../../features/access_template/AccessPackageTemplateContainer";

class Routes extends React.Component {

    render() {
        return (
            <div>
                <Route exact path='/' component={OrganisationContainer}/>
            </div>
        );
    }
}

export default Routes;

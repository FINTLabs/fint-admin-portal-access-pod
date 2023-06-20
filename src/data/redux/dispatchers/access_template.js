import {fetchAccessTemplatesSuccess} from "../actions/access_templates";
import AccessTemplateApi from "../../api/AccessTemplateApi";

export function fetchAccessTemplates() {
    return (dispatch) => {
        return AccessTemplateApi.fetchAccessTemplates().then(response => {
            dispatch(fetchAccessTemplatesSuccess(response));
        }).catch(error => {
            throw(error);
        })
    }
}
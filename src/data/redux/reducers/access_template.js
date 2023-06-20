import {
    CREATE_TEMPLATES_SUCCESS,
    DELETE_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_SUCCESS, UPDATE_SELECTED_ACCESS_PACKAGE_BEFORE_CHANGES, UPDATE_SELECTED_FOR_EDITING_PACKAGE,
    UPDATE_TEMPLATES_SUCCESS
} from "../actions/types";

export default function accessTemplate(state = [], action) {
    switch (action.type) {
        case FETCH_TEMPLATES_SUCCESS:
            return {...state, access_templates: action.payload};
        case CREATE_TEMPLATES_SUCCESS:
            return {...state, access_templates: action.payload};
        case UPDATE_TEMPLATES_SUCCESS:
            return {...state, access_templates: action.payload};
        case DELETE_TEMPLATES_SUCCESS:
            return {
                ...state,
                access_templates: state.access_templates.filter(template => action.payload !== template)
            };
        case UPDATE_SELECTED_FOR_EDITING_PACKAGE:
            return {
                ...state, selectedForEditing: action.payload
            };
        case UPDATE_SELECTED_ACCESS_PACKAGE_BEFORE_CHANGES:
            return {
                ...state, selectedAccessPackageBeforeEdit: action.payload
            };
        default:
            return state
    }
}
import {
    FETCH_TEMPLATES_SUCCESS,
    UPDATE_SELECTED_ACCESS_PACKAGE_BEFORE_CHANGES,
    UPDATE_SELECTED_FOR_EDITING_PACKAGE,
    UPDATE_TEMPLATES_SUCCESS
} from "./types";


export function fetchAccessTemplatesSuccess(payload) {
    return {
        type: FETCH_TEMPLATES_SUCCESS,
        payload: payload
    }
}

export function updateAccessPackages(accessPackage) {
    return {
        type: UPDATE_TEMPLATES_SUCCESS,
        payload: accessPackage
    }
}

export function setSelectedForEditingPackage(accessPackageId) {
    return {
        type: UPDATE_SELECTED_FOR_EDITING_PACKAGE,
        payload: accessPackageId,
    }
}
export function setAccessPackageBeforeChanges(accessPackage) {
    return {
        type: UPDATE_SELECTED_ACCESS_PACKAGE_BEFORE_CHANGES,
        payload: accessPackage,
    }
}
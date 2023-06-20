
class AccessTemplateApi {

    static fetchAccessTemplates() {
        const url = `/api/accesspackage/template`;
        return fetch(url,
            {
                method: 'GET',
                credentials: 'same-origin'
            },
        ).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        })
    }
    static createAccessTemplates(accessPackage) {
        const url = `/api/accesspackage/template`;
        return fetch(url,
            {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(accessPackage)
            },
        )
    }
    static updateAccessTemplates(accessPackage) {
        const url = `/api/accesspackage/template/${accessPackage.name}`;
        return fetch(url,
            {
                method: 'PUT',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accessPackage)
            },
        )
    }
    static deleteAccessTemplates(accessPackage) {
        const url = `/api/accesspackage/template/` + accessPackage.name;
        return fetch(url,
            {
                method: 'DELETE',
                credentials: 'same-origin'
            },
        ).then(response => {
            return response;
        }).catch(error => {
            console.log("Delete Errror: ", error);
            return error;
        })
    }
}

export default AccessTemplateApi

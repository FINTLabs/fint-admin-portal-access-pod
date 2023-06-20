class MaintanceApi {

  static getOrganisationConsistency() {
    const url = `/api/maintenance/consistency/components/organisations`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => Promise.all([response, response.json()]));

  }

  static getAdapterConsistency() {
    const url = `/api/maintenance/consistency/components/adapters`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => Promise.all([response, response.json()]));

  }

  static getClientConsistency() {
    const url = `/api/maintenance/consistency/components/clients`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => Promise.all([response, response.json()]));

  }

  static getLegalConsistency() {
    const url = `/api/maintenance/consistency/contacts/legal`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => Promise.all([response, response.json()]));

  }

  static getTechnicalConsistency() {
    const url = `/api/maintenance/consistency/contacts/technical`;
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin'
    }).then(response => Promise.all([response, response.json()]));

  }
}

export default MaintanceApi;
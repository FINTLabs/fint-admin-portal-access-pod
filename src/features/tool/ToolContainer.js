import React, { Component } from 'react'
import DataStoreConsistency from './consistency/DataStoreConsistency';

export default class ToolContainer extends Component {
    render() {
        return (
            <div>
                <DataStoreConsistency/>
            </div>
        )
    }
}

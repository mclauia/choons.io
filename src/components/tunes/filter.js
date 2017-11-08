import React, { Component } from 'react';

import {
    FormControl
} from 'react-bootstrap';

import { TuneTypeSelect, TuneKeySelect, TuneRealmSelect } from './form';

export default class FilterWidget extends Component {
    state = {
        filterBy: '',
        filterTo: '',
    }
    render() {
        return (
            <div>
                <FormControl
                    componentClass="select"
                    value={this.state.filterBy}
                    onChange={(e) => this.setState({ filterBy: e.target.value })}
                >
                    <option value="">-- Filter By --</option>
                    <option value="type">Type</option>
                    <option value="musicKey">Key</option>
                    <option value="stage">Stage</option>
                    <option value="realm">Realm</option>
                    <option value="source">Source</option>
                    <option value="session">Session</option>
                </FormControl>
                {this.state.filterBy === 'type' &&
                    <TuneTypeSelect value={this.state.filterTo} onChange={(e) => {
                        this.setState({ filterTo: e.target.value });
                        this.props.onFilterSelect(this.state.filterBy, e.target.value);
                    }}/>
                }
                {this.state.filterBy === 'musicKey' &&
                    <TuneKeySelect value={this.state.filterTo} onChange={(e) => {
                        this.setState({ filterTo: e.target.value });
                        this.props.onFilterSelect(this.state.filterBy, e.target.value);
                    }}/>
                }
                {this.state.filterBy === 'realm' &&
                    <TuneRealmSelect value={this.state.filterTo} onChange={(e) => {
                        this.setState({ filterTo: e.target.value });
                        this.props.onFilterSelect(this.state.filterBy, e.target.value);
                    }}/>
                }
                {this.state.filterBy === 'stage' &&
                    <FormControl
                        componentClass="select"
                        value={this.state.filterTo}
                        onChange={(e) => {
                            this.setState({ filterTo: e.target.value })
                            this.props.onFilterSelect(this.state.filterBy, e.target.value);
                        }}
                    >
                        <option value="">-- Choose Stage --</option>
                        <option value="learn">Learn</option>
                        <option value="enhance">Work on it</option>
                        <option value="drill">Drill it</option>
                        <option value="perform">Perform it</option>
                        <option value="embellish">Embellish it</option>
                    </FormControl>
                }
                {this.state.filterBy === 'source' &&
                    <FormControl
                        componentClass="select"
                        value={this.state.filterTo}
                        onChange={(e) => {
                            this.setState({ filterTo: e.target.value })
                            this.props.onFilterSelect(this.state.filterBy, e.target.value);
                        }}
                    >
                        <option value="">-- Choose Source --</option>
                        {this.props.sources.map((source, i) => <option key={i} value={source}>{source}</option>)}
                    </FormControl>
                }
                {this.state.filterBy === 'session' &&
                    <FormControl
                        componentClass="select"
                        value={this.state.filterTo}
                        onChange={(e) => {
                            this.setState({ filterTo: e.target.value })
                            this.props.onFilterSelect(this.state.filterBy, e.target.value);
                        }}
                    >
                        <option value="">-- Choose Session --</option>
                        {this.props.sessions.map((session, i) => <option key={i} value={session}>{session}</option>)}
                    </FormControl>
                }
            </div>
        )
    }
}
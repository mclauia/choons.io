// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Well,
    Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { push, goBack } from 'react-router-redux';
import localStorage from 'local-storage';

import { pushNewTune } from '../../firebase';

import TuneNav from './nav'
import { getDefaultHintFor } from './utils'
import { TuneTypeSelect, TuneKeySelect, TuneRealmSelect, TuneHintEditor } from './form';

class TuneAdd extends Component {
    constructor(props) {
        super(props);

        const cachedTuneData = {
            type: localStorage.get(`CHOONS/newTune/type`),
            realm: localStorage.get(`CHOONS/newTune/realm`),
            source: localStorage.get(`CHOONS/newTune/source`),
            session: localStorage.get(`CHOONS/newTune/session`)
        }
        this.state = {
            tuneNameValue: '',
            aliasesValue: '',
            typeValue: cachedTuneData.type || '',
            musicKeyValue: '',
            realmValue: cachedTuneData.realm || '',
            sourceValue: cachedTuneData.source || '',
            sessionValue: cachedTuneData.session || '',
            videoValue: '',
            stageValue: '',
            notesValue: '',
            hintValue: '',
        }
    }

    persistTune() {
        this.props.persistNewTune({
            name: this.state.tuneNameValue,
            aliases: this.state.aliasesValue,
            type: this.state.typeValue,
            musicKey: this.state.musicKeyValue,
            realm: this.state.realmValue,
            source: this.state.sourceValue,
            session: this.state.sessionValue,
            video: this.state.videoValue,
            notes: this.state.notesValue,
            stage: this.state.stageValue,
            abc: this.state.hintValue,
            dateAdded: Date.now()
        });
        this.props.goBack();
    }

    maybePrefillHint = () => {
        const { hintValue, typeValue } = this.state;
        const nextHint = hintValue ? hintValue : getDefaultHintFor(typeValue);
        this.setState({ hintValue: nextHint });
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Add a Choon</h1>
                    <TuneNav back={true} />
                    <FormGroup controlId="tuneName">
                        <ControlLabel>Name</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.tuneNameValue}
                            type="text"
                            onChange={(e) => this.setState({ tuneNameValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneAliases">
                        <ControlLabel>Aliases</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.aliasesValue}
                            type="text"
                            onChange={(e) => this.setState({ aliasesValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneType">
                        <ControlLabel>Type</ControlLabel>
                        {' '}
                        <TuneTypeSelect value={this.state.typeValue}
                            onChange={(e) => {
                                this.setState({ typeValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/type`, e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneKey">
                        <ControlLabel>Key</ControlLabel>
                        {' '}
                        <TuneKeySelect value={this.state.musicKeyValue}
                            onChange={(e) => {
                                this.setState({ musicKeyValue: e.target.value })
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneRealm">
                        <ControlLabel>Realm</ControlLabel>
                        {' '}
                        <TuneRealmSelect value={this.state.realmValue}
                            onChange={(e) => {
                                this.setState({ realmValue: e.target.value })
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneSource">
                        <ControlLabel>Source</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.sourceValue}
                            type="text"
                            name="source"
                            onChange={(e) => {
                                this.setState({ sourceValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/source`, e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneSession">
                        <ControlLabel>Session</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.sessionValue}
                            type="text"
                            name="session"
                            onChange={(e) => {
                                this.setState({ sessionValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/session`, e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneVideo">
                        <ControlLabel>Video URL</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.videoValue}
                            type="text"
                            onChange={(e) => this.setState({ videoValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneStage">
                        <ControlLabel>Stage</ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            value={this.state.stageValue}
                            onChange={(e) => {
                                this.setState({ stageValue: e.target.value })
                            }}
                        >
                            <option value="learn">Learn</option>
                            <option value="enhance">Work on it</option>
                            <option value="drill">Drill it</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="tuneNotes">
                        <ControlLabel>Notes</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.notesValue}
                            componentClass="textarea"
                            onChange={(e) => this.setState({ notesValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneHint">
                        <ControlLabel>Hint</ControlLabel>
                        {' '}
                        <TuneHintEditor value={this.state.hintValue}
                            onChange={(e) => this.setState({ hintValue: e.target.value })}
                            onFocus={this.maybePrefillHint}
                        />
                    </FormGroup>
                    <Button bsStyle="success" onClick={() => { this.persistTune() }}>Save Tune</Button>
                </Col>
            </Row>
        );
    }
}


function mapAppStateToProps(state) {
    return {
        routePath: state.router.location.pathname
    }
}

export default connect(
    mapAppStateToProps,
    {
        persistNewTune: (tune) => (dispatch, getState) => {
            pushNewTune(tune, getState().user)
        },
        pushRoute: push,
        goBack
    }
)(TuneAdd);

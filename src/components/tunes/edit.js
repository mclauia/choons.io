// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col,
    Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { push, goBack } from 'react-router-redux';
import Autosuggest from 'react-bootstrap-autosuggest';

import { updateTune } from '../../firebase';

import TuneNav from './nav'
import { getDefaultHintFor } from './utils';
import { TuneTypeSelect, TuneKeySelect, TuneRealmSelect, TuneHintEditor, TuneStageSelect } from './form';

class TuneEdit extends Component {
    constructor(props) {
        super(props);

        const { tune } = props;
        this.state = {
            tuneNameValue: tune.name || '',
            aliasesValue: tune.aliases || '',
            typeValue: tune.type || '',
            musicKeyValue: tune.musicKey || '',
            realmValue: tune.realm || '',
            stageValue: tune.stage || '',
            sourceValue: tune.source || '',
            sessionValue: tune.session || '',
            notesValue: tune.notes || '',

            eraValue: tune.era || '',
            composerValue: tune.composer || '',
            videoValue: tune.video || '',
            video2Value: tune.video2 || '',
            dotsValue: tune.dots || '',
            hintValue: tune.abc || '',
        }
    }

    persistTune() {
        this.props.persistTuneChanges({
            ...this.props.tune,
            name: this.state.tuneNameValue,
            aliases: this.state.aliasesValue,
            type: this.state.typeValue,
            musicKey: this.state.musicKeyValue,
            realm: this.state.realmValue,
            source: this.state.sourceValue,
            session: this.state.sessionValue,
            notes: this.state.notesValue,
            era: this.state.eraValue,
            composer: this.state.composerValue,
            video: this.state.videoValue,
            video2: this.state.video2Value,
            dots: this.state.dotsValue,
            abc: this.state.hintValue,
        });
        this.props.goBack()
    }

    maybePrefillHint = () => {
        const { hintValue, typeValue, musicKeyValue } = this.state;
        const nextHint = hintValue ? hintValue : getDefaultHintFor(typeValue, musicKeyValue);
        this.setState({ hintValue: nextHint });
    }

    render() {
        const { tune } = this.props;

        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Edit {tune.name}</h1>
                    <TuneNav back={true} view={tune.id} userId={this.props.userId} />
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
                        <Autosuggest
                            datalist={this.props.sources}
                            placeholder="so-and-so"
                            value={this.state.sourceValue}
                            type="text"
                            name="source"
                            onChange={(value) => {
                                this.setState({ sourceValue: value })
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="tuneSession">
                        <ControlLabel>Session</ControlLabel>
                        {' '}
                        <Autosuggest
                            datalist={this.props.sessions}
                            placeholder="that one session"
                            value={this.state.sessionValue}
                            type="text"
                            name="session"
                            onChange={(value) => {
                                this.setState({ sessionValue: value })
                            }}
                        />
                    </FormGroup>

                    <FormGroup controlId="tuneEra">
                        <ControlLabel>Era</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.eraValue}
                            type="text"
                            onChange={(e) => this.setState({ eraValue: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="tuneComposer">
                        <ControlLabel>Composer</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.composerValue}
                            type="text"
                            onChange={(e) => this.setState({ composerValue: e.target.value })}
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

                    <FormGroup controlId="tuneVideo2">
                        <ControlLabel>Video URL 2</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.video2Value}
                            type="text"
                            onChange={(e) => this.setState({ video2Value: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="tuneDots">
                        <ControlLabel>Dots</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.dotsValue}
                            type="text"
                            onChange={(e) => this.setState({ dotsValue: e.target.value })}
                        />
                    </FormGroup>

                    <FormGroup controlId="tuneStage">
                        <ControlLabel>Stage</ControlLabel>
                        {' '}
                        <TuneStageSelect value={this.state.stageValue}
                            onChange={(e) => {
                                this.setState({ stageValue: e.target.value })
                            }}
                        />
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
                    <Button bsStyle="success" onClick={() => { this.persistTune() }}>Save Changes</Button>
                </Col>
            </Row>
        );
    }
}

function mapAppStateToProps(state) {
    return {
        sessions: state.sessions.toJS(),
        sources: state.sources.toJS(),
        routePath: state.router.location.pathname
    }
}

export default connect(
    mapAppStateToProps,
    {
        persistTuneChanges: (tune) => (dispatch, getState) => {
            updateTune(tune, getState().user)
        },
        pushRoute: push,
        goBack,
    }
)(TuneEdit);

// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Well,
    Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { push, goBack } from 'react-router-redux';

import { updateTune } from '../../firebase';

import TuneNav from './nav'
import { renderAbcTo } from './utils';

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

    render() {
        const { tune } = this.props;

        renderAbcTo(this.state.hintValue, 'tuneHintPreview')

        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Edit {tune.name}</h1>
                    <TuneNav back={true} view={tune.id} />
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
                        <FormControl
                            componentClass="select"
                            value={this.state.typeValue}
                            onChange={(e) => {
                                this.setState({ typeValue: e.target.value })
                            }}
                        >
                            <option value="">-- Choose Type --</option>
                            <option value="reel">Reel</option>
                            <option value="hornpipe">Hornpipe</option>
                            <option value="jig">Jig</option>
                            <option value="slide">Slide</option>
                            <option value="slipjig">Slipjig</option>
                            <option value="waltz">Waltz</option>
                            <option value="air">Air</option>
                            <option value="barndance">Barndance</option>
                            <option value="7dance">7 Dance</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="tuneKey">
                        <ControlLabel>Key</ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            value={this.state.musicKeyValue}
                            onChange={(e) => {
                                this.setState({ musicKeyValue: e.target.value })
                            }}
                        >
                            <option value="">-- Choose Key --</option>
                            <option value="D">D</option>
                            <option value="Dm">Dm</option>
                            <option value="E">E</option>
                            <option value="Em">Em</option>
                            <option value="F">F</option>
                            <option value="Fm">Fm</option>
                            <option value="G">G</option>
                            <option value="Gm">Gm</option>
                            <option value="A">A</option>
                            <option value="Am">Am</option>
                            <option value="B">B</option>
                            <option value="Bm">Bm</option>
                            <option value="C">C</option>
                            <option value="Cm">Cm</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="tuneRealm">
                        <ControlLabel>Realm</ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            value={this.state.realmValue}
                            onChange={(e) => {
                                this.setState({ realmValue: e.target.value })
                            }}
                        >
                            <option value="">-- Choose Realm --</option>
                            <option value="irish">Irish</option>
                            <option value="quebecois">Québécois</option>
                            <option value="scottish">Scottish</option>
                            <option value="arabic">Arabic</option>
                            <option value="oldtime">Oldtime</option>
                            <option value="other">Other</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="tuneSource">
                        <ControlLabel>Source</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.sourceValue}
                            type="text"
                            name="source"
                            autoComplete={'on'}
                            onChange={(e) => {
                                this.setState({ sourceValue: e.target.value })
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
                            autoComplete={'on'}
                            onChange={(e) => {
                                this.setState({ sessionValue: e.target.value })
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
                        <FormControl
                            style={{ fontFamily: 'monospace', height: 120 }}
                            value={this.state.hintValue}
                            componentClass="textarea"
                            onChange={(e) => this.setState({ hintValue: e.target.value })}
                        />
                        {this.state.hintValue && <Well>
                            <div id="tuneHintPreview"></div>
                        </Well>}
                    </FormGroup>
                    <Button bsStyle="success" onClick={() => { this.persistTune() }}>Save Changes</Button>
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
        persistTuneChanges: (tune) => (dispatch, getState) => {
            updateTune(tune, getState().user)
        },
        pushRoute: push,
        goBack,
    }
)(TuneEdit);

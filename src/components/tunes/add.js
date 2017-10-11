// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col,
    Button, FormGroup, FormControl, ControlLabel,
} from 'react-bootstrap';
import { push, goBack } from 'react-router-redux';
import localStorage from 'local-storage';

import { pushNewTune } from '../../firebase';
// import './preload';
import TuneNav from './nav'

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
            notesValue: '',
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
            notes: this.state.notesValue,
            dateAdded: Date.now()
        });
        this.props.goBack();
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Add a Choon</h1>
                    <TuneNav back={true} />
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Name</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.tuneNameValue}
                            type="text"
                            onChange={(e) => this.setState({ tuneNameValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Aliases</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.aliasesValue}
                            type="text"
                            onChange={(e) => this.setState({ aliasesValue: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Type</ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            value={this.state.typeValue}
                            onChange={(e) => {
                                this.setState({ typeValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/type`, e.target.value)
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
                    <FormGroup controlId="chapterShortDesc">
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
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Realm</ControlLabel>
                        {' '}
                        <FormControl
                            componentClass="select"
                            value={this.state.realmValue}
                            onChange={(e) => {
                                this.setState({ realmValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/realm`, e.target.value)
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
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Source</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.sourceValue}
                            type="text"
                            onChange={(e) => {
                                this.setState({ sourceValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/source`, e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Session</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.sessionValue}
                            type="text"
                            onChange={(e) => {
                                this.setState({ sessionValue: e.target.value })
                                localStorage.set(`CHOONS/newTune/session`, e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup controlId="chapterShortDesc">
                        <ControlLabel>Notes</ControlLabel>
                        {' '}
                        <FormControl
                            value={this.state.notesValue}
                            componentClass="textarea"
                            onChange={(e) => this.setState({ notesValue: e.target.value })}
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

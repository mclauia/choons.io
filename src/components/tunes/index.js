// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
    Button,
    Row, Col, Table,
    ButtonToolbar, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { push } from 'react-router-redux';

import TuneView, { TuneFlags } from './view'
import TuneEdit from './edit'
import TuneNav from './nav'

import { filter, sort, pretty } from './utils';

class Tunes extends Component {
    state = {
        filterSortSelections: [],
        typeaheadSelections: []
    }

    setFlags = (nextSelections) => {
        if (nextSelections.length) {
            this.props.pushRoute(`/tunes/byFlag/${nextSelections.join('')}`)
        } else {
            this.props.pushRoute(`/tunes`)
        }
    }
    setRealms = (selection) => {
        this.props.pushRoute(`/tunes/filter/realm/${selection}`)
    }

    seePractice = () => this.props.pushRoute(`/tunes/sort/lastPracticedTimestamp/desc`)
    seeHistory = () => this.props.pushRoute(`/tunes/sort/dateLearnt/desc`)

    render() {
        const { tunes, filterKey, filterValue } = this.props;

        return (
            <Row>
                <Col xs={12} md={12}>
                    <Route exact path="/tunes" render={(props) => {
                        return (
                            <Row><Col xs={12} md={12}>
                                <h1>All Choons</h1>
                                <TuneNav add={true} />
                                <Row className="pad-butt"><Col xs={12} md={12}>
                                    <div className="pull-left">
                                        <FilterFlags flags={''} onSelect={this.setFlags} />
                                    </div>
                                    <div className="pull-left" style={{ marginLeft: 10 }}>
                                        <FilterRealms onSelect={this.setRealms} />
                                    </div>
                                    <div className="pull-left" style={{ marginLeft: 10 }}>
                                        <Button onClick={this.seePractice}>Practice</Button>
                                    </div>
                                    <div className="pull-left" style={{ marginLeft: 10 }}>
                                        <Button onClick={this.seeHistory}>History</Button>
                                    </div>
                                </Col></Row>

                                <Typeahead
                                    onChange={(selections) => {
                                        this.props.pushRoute(`/tunes/view/${selections[0].id}`)
                                    }}
                                    maxResults={20}
                                    minLength={3}
                                    options={tunes.toArray()}
                                    labelKey="name"
                                />
                                <br />
                                <TunesTable tunes={sort(tunes).by('name')}/>
                            </Col></Row>
                        )
                    }}/>
                    <Route path="/tunes/byFlag/:flags" render={({match:{params: {flags}}}) => (
                        <div>
                            <h1>Some Choons</h1>
                            <TuneNav add={true} back={true} />
                            <FilterFlags flags={flags} onSelect={this.setFlags} />
                            <br />
                            <TunesTable tunes={sort(filter(tunes).byFlags(flags)).by('name')}/>
                        </div>
                    )}/>
                    <Route path="/tunes/filter/:filterKey?/:filterValue?" render={(props) => (
                        <div>
                            <h1>Some Choons</h1>
                            <TuneNav add={true} back={true} />
                            <TunesTable tunes={sort(filter(tunes).byKey(filterKey, filterValue)).by('name')}/>
                        </div>
                    )}/>
                    <Route path="/tunes/sort/:sortKey?/:sortDir?" render={({match:{params: {sortKey, sortDir}}}) => (
                        <div>
                            <h1>Some Choons</h1>
                            <TuneNav add={true} back={true} />
                            <TunesTable tunes={sort(tunes.filter((tune) => tune[sortKey])).by(sortKey, sortDir)}/>
                        </div>
                    )}/>
                    <Route path="/tunes/view/:tuneId" render={({match:{params: {tuneId}}}) => (
                        tunes.has(tuneId) ? <TuneView tune={tunes.get(tuneId)}/> : null
                    )}/>
                    <Route path="/tunes/edit/:tuneId" render={({match:{params: {tuneId}}}) => (
                        tunes.has(tuneId) ? <TuneEdit tune={tunes.get(tuneId)}/> : null
                    )}/>
                </Col>
            </Row>
        );
    }
}

function FilterFlags({ flags, onSelect }) {
    return <ButtonToolbar>
        <ToggleButtonGroup type="checkbox"
            value={Array.from(flags)}
            onChange={onSelect}>
            <ToggleButton value={'🔰'}><span role="img" aria-label="Learned recently">🔰</span></ToggleButton>
            <ToggleButton value={'🎻'}><span role="img" aria-label="Practiced recently">🎻</span></ToggleButton>
            <ToggleButton value={'🌕'}><span role="img" aria-label="Added recently">🌕</span></ToggleButton>
            <ToggleButton value={'🕸'}><span role="img" aria-label="Hasn't been practiced recently">🕸</span></ToggleButton>
            <ToggleButton value={'🌑'}><span role="img" aria-label="Never got learned">🌑</span></ToggleButton>
            <ToggleButton value={'⭐'}><span role="img" aria-label="Practiced a lot">⭐</span></ToggleButton>
        </ToggleButtonGroup>
    </ButtonToolbar>
}

function FilterRealms({ onSelect }) {
    return <ButtonToolbar>
        <ToggleButtonGroup type="radio"
            name="realmFilter"
            value={null}
            onChange={onSelect}>
            <ToggleButton value={'quebecois'}>Quebecois</ToggleButton>
            <ToggleButton value={'irish'}>Irish</ToggleButton>
            <ToggleButton value={'scottish'}>Scottish</ToggleButton>
        </ToggleButtonGroup>
    </ButtonToolbar>
}

function TunesTable({ tunes }) {
    return <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Key</th>
                <th>Stage</th>
                <th>Realm</th>
                <th>Source</th>
            </tr>
        </thead>
        <tbody>
            {tunes.toArray().map((tune, i) =>
                <tr key={tune.id}>
                    <td>{i+1}</td>
                    <td>
                        <Link to={`/tunes/edit/${tune.id}`}><Button bsSize="small" className="pull-right">Edit</Button></Link>
                        <Link to={`/tunes/view/${tune.id}`}>{tune.name} <TuneFlags tune={tune} /></Link>
                    </td>
                    <td><Link to={`/tunes/filter/type/${tune.type}`}>{pretty(tune.type)}</Link></td>
                    <td><Link to={`/tunes/filter/musicKey/${tune.musicKey}`}>{tune.musicKey}</Link></td>
                    <td><Link to={`/tunes/filter/stage/${tune.stage}`}>{pretty(tune.stage)}</Link></td>
                    <td><Link to={`/tunes/filter/realm/${tune.realm}`}>{pretty(tune.realm)}</Link></td>
                    <td><Link to={`/tunes/filter/source/${tune.source}`}>{tune.source}</Link></td>
                </tr>
            )}
        </tbody>
    </Table>
}

function mapAppStateToProps(state) {
    const pathMatch = state.router.location.pathname.match(/\/tunes\/filter\/(.+)\/(.+)/);
    return {
        tunes: state.tunes,
        filterKey: pathMatch ? pathMatch[1] : null,
        filterValue: pathMatch ? pathMatch[2] : null
    }
}

export default connect(
    mapAppStateToProps,
    {
        pushRoute: push,
    }
)(Tunes);

// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import localStorage from 'local-storage';
import {
    Button, Alert,
    Row, Col, Table,
    ButtonToolbar, ToggleButtonGroup, ToggleButton,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { push } from 'react-router-redux';

import TuneView, { TuneFlags } from './view'
import TuneEdit from './edit'
import TuneNav from './nav'
import FilterWidget from './filter';
import { filter, sort, pretty, formatTimestamp, getSortForFlags } from './utils';

import { fetchReadList, importTune } from './read';

class Tunes extends Component {
    state = {
        filterSortSelections: [],
        typeaheadSelections: []
    }

    componentDidMount() {
        if (this.props.userId !== 'my') {
            this.props.fetchReadList(this.props.userId);
        }
    }

    setFlags = (nextSelections) => {
        if (nextSelections.length) {
            this.props.pushRoute(`/${this.props.userId}/tunes/byFlag/${nextSelections.join('')}`)
        } else {
            this.props.pushRoute(`/${this.props.userId}/tunes`)
        }
    }
    setRealms = (selection) => {
        this.props.pushRoute(`/${this.props.userId}/tunes/filter/realm/${selection}`)
    }

    seePractice = () => this.props.pushRoute(`/${this.props.userId}/tunes/sort/lastPracticedTimestamp/desc`)
    seeHistory = () => this.props.pushRoute(`/${this.props.userId}/tunes/sort/dateLearnt/desc`);

    filterDown = (filterBy, filterTo) => {
        this.props.pushRoute(`/${this.props.userId}/tunes/filter/${filterBy}/${filterTo}`)
        const oldFilterCrumbs = localStorage.get('CHOONS/filterCrumbs') || [];
        oldFilterCrumbs.unshift({title: pretty(filterTo), path: `/${this.props.userId}/tunes/filter/${filterBy}/${filterTo}`});

        const newFilterCrumbs = oldFilterCrumbs.slice(0, 3);
        localStorage.set('CHOONS/filterCrumbs', newFilterCrumbs);
    }

    render() {
        const { userId, myTunes, readTunes, filterKey, filterValue, message, sessions, sources } = this.props;

        const isMine = userId === 'my';

        const filterCrumbs = localStorage.get('CHOONS/filterCrumbs') || [];

        const tunes = isMine ? myTunes : readTunes;

        const FilterSortRow = <div>
            <Row>
                <Col xs={12} md={4} className="pad-butt">
                    <FilterWidget onFilterSelect={this.filterDown} sessions={sessions} sources={sources} />
                </Col>
                <Col xs={12} md={8}>
                    <div className="pull-left pad-butt">
                        <FilterFlags flags={''} onSelect={this.setFlags} />
                    </div>
                    <div className="pull-left pad-butt" style={{ marginLeft: 10 }}>
                        <Button onClick={this.seePractice}>Practice History</Button>
                    </div>
                    <div className="pull-left pad-butt" style={{ marginLeft: 10 }}>
                        <Button onClick={this.seeHistory}>Learnt History</Button>
                    </div>
                </Col>
            </Row>
            {!!filterCrumbs.length && <Row className="pad-butt">
                <Col xs={12} md={8}>
                    Recent: {filterCrumbs.map((crumb, i) => (
                        <span key={i}>{i > 0 ? ' | ' : ''} <Link to={`${crumb.path}`}>{crumb.title}</Link></span>
                    ))}
                </Col>
            </Row>}
        </div>

        return (
            <Row>
                {tunes && <Col xs={12} md={12}>
                    {message && <Alert>{message}</Alert>}
                    <Route exact path={`/${userId}/tunes`} render={(props) => {
                        return (
                            <Row><Col xs={12} md={12}>
                                <h1>{`${isMine ? 'All My' : 'All Their'}`} Choons</h1>
                                <TuneNav userId={userId} add={isMine} />
                                {FilterSortRow}

                                <Typeahead
                                    onChange={(selections) => {
                                        this.props.pushRoute(`/${userId}/tunes/view/${selections[0].id}`)
                                    }}
                                    maxResults={20}
                                    minLength={3}
                                    options={tunes.toArray()}
                                    labelKey="name"
                                />
                                <br />
                                <TunesTable
                                    userId={userId}
                                    onImport={this.props.importTune}
                                    tunes={sort(tunes).by('name')}
                                />
                            </Col></Row>
                        )
                    }}/>
                    <Route path={`/${userId}/tunes/byFlag/:flags`} render={({ match:{ params: { flags } } }) => (
                        <div>
                            <h1>{flags} Choons</h1>
                            <TuneNav userId={userId} add={isMine} back={true} />
                            {FilterSortRow}
                            <br />
                            <TunesTable
                                userId={userId}
                                tunes={sort(filter(tunes).byFlags(flags)).by(...getSortForFlags(flags))}
                                onImport={this.props.importTune}
                            />
                        </div>
                    )}/>
                    <Route path={`/${userId}/tunes/filter/:filterKey?/:filterValue?`} render={({ match:{ params: { filterKey, filterValue } } }) => (
                        <div>
                            <h1>{headerify(filterKey, filterValue)}</h1>
                            <TuneNav userId={userId} add={isMine} back={true} />
                            {FilterSortRow}
                            <TunesTable
                                userId={userId}
                                tunes={sort(filter(tunes).byKey(filterKey, filterValue)).by('name')} filterKey={filterKey} filterValue={filterValue}
                                onImport={this.props.importTune}
                            />
                        </div>
                    )}/>
                    <Route path={`/${userId}/tunes/sort/:sortKey?/:sortDir?`} render={({match:{params: {sortKey, sortDir}}}) => (
                        <div>
                            <h1>Choons by {pretty(sortKey)}</h1>
                            <TuneNav userId={userId} add={isMine} back={true} />
                            {FilterSortRow}
                            <TunesTable
                                userId={userId}
                                tunes={sort(tunes.filter((tune) => tune[sortKey])).by(sortKey, sortDir)} sortKey={sortKey}
                                onImport={this.props.importTune}
                            />
                        </div>
                    )}/>
                    <Route path={`/${userId}/tunes/view/:tuneId`} render={({match:{params: {tuneId}}}) => (
                        tunes.has(tuneId) ? <TuneView
                            tune={tunes.get(tuneId)}
                            userId={userId}
                            onImport={this.props.importTune}
                         /> : null
                    )}/>
                    {isMine && <Route path={`/${userId}/tunes/edit/:tuneId`} render={({match:{params: {tuneId}}}) => (
                        tunes.has(tuneId) ? <TuneEdit tune={tunes.get(tuneId)} userId={userId} /> : null
                    )}/>}
                </Col>}
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

const timestampKeys = [
    'lastPracticedTimestamp',
    'dateLearnt',
    'dateAdded'
];

function TunesTable({ tunes, filterKey, filterValue, sortKey, userId, onImport }) {
    const isMine = userId === 'my';
    const timestampColumn = timestampKeys.includes(sortKey) ? sortKey : null;
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
                {timestampColumn && <th>{pretty(sortKey)}</th>}
            </tr>
        </thead>
        <tbody>
            {tunes.toArray().map((tune, i) =>
                <tr key={tune.id}>
                    <td>{i+1}</td>
                    <td>
                        {isMine && <Link to={`/${userId}/tunes/edit/${tune.id}`}>
                            <Button bsSize="small" className="pull-right">Edit</Button>
                        </Link>}
                        {!isMine && <Button bsSize="small" className="pull-right" onClick={() => onImport(tune)}>Import</Button>}
                        <Link to={`/${userId}/tunes/view/${tune.id}`}>{tune.name} <TuneFlags tune={tune} /></Link>
                    </td>
                    <td><Link to={`/${userId}/tunes/filter/type/${tune.type}`}>{pretty(tune.type)}</Link></td>
                    <td><Link to={`/${userId}/tunes/filter/musicKey/${tune.musicKey}`}>{tune.musicKey}</Link></td>
                    <td><Link to={`/${userId}/tunes/filter/stage/${tune.stage}`}>{pretty(tune.stage)}</Link></td>
                    <td><Link to={`/${userId}/tunes/filter/realm/${tune.realm}`}>{pretty(tune.realm)}</Link></td>
                    <td><Link to={`/${userId}/tunes/filter/source/${tune.source}`}>{tune.source}</Link></td>
                    {timestampColumn && <td>{formatTimestamp(tune[sortKey], false)}</td>}
                </tr>
            )}
        </tbody>
    </Table>
}

function mapAppStateToProps(state) {
    const userIdMatch = state.router.location.pathname.match(/\/(.+)\/tunes/);
    const filterMatch = state.router.location.pathname.match(/\/tunes\/filter\/(.+)\/(.+)/);
    const userId = userIdMatch ? userIdMatch[1] : 'my';
    return {
        userId,
        myTunes: state.tunes,
        readTunes: userIdMatch ? state.readTunes.get(userId) : null,
        filterKey: filterMatch ? filterMatch[1] : null,
        filterValue: filterMatch ? filterMatch[2] : null,
        message: state.messages,
        sessions: state.sessions.toJS(),
        sources: state.sources.toJS(),
    }
}

export default connect(
    mapAppStateToProps,
    {
        pushRoute: push,
        fetchReadList,
        importTune
    }
)(Tunes);

function headerify(filterKey, filterValue) {
    switch (filterKey) {
        case 'type':
            switch (filterValue) {
                case 'reel': return 'Reels';
                case 'hornpipe': return 'Hornpipes';
                case 'jig': return 'Jigs';
                case 'slide': return 'Slides';
                case 'slipjig': return 'Slipjigs';
                case 'waltz': return 'Waltzes';
                case 'march': return 'Marches';
                case 'air': return 'Airs';
                case 'barndance': return 'Barndances';
                case '7dance': return '7 Dances';
                case 'gigue': return 'Gigues';
            }
        case 'musicKey':
            return `Choons in ${filterValue}`;
        case 'stage':
            switch (filterValue) {
                case 'learn': return 'Choons to Learn';
                case 'drill': return 'Choons to Drill';
                case 'enhance': return 'Choons to Work On';
                case 'perform': return 'Choons to Perform';
                case 'embellish': return 'Choons to Embellish';
            }
        case 'realm':
            return `${pretty(filterValue)} Choons`;
        case 'source':
            return `Choons from ${filterValue}`;
        case 'session':
            return `Session Choons for ${filterValue}`;

        default:
            return ''
    }
}

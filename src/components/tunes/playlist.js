import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Table, Button, Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TuneFlags } from './view'

import { pretty } from './utils';

import { push, goBack } from 'react-router-redux';

import {
    updateTune,
    removeFromQueue,
    appendToCurrentPlaylistSet,
    moveCurrentSetToPlayed,
    clearPlaylists
} from '../../firebase';

class TuneQueue extends Component {
    render() {
        const {
            tunes,
            addMinute,
            completeQueueItem,
            appendTuneToCurrentPlaylistSet,
            nextSet,
            clearMarquee,
            areSpiders,
            isSimplePractice
        } = this.props;
        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Playlist</h1>

                    <div className="pad-butt">
                        {/*<Button
                            bsStyle="info"
                            bsSize="small"
                            onClick={() => nextSet()}>Next Marquee Set</Button>*/}
                        {' '}
                        <Button
                            bsStyle="info"
                            bsSize="small"
                            onClick={() => clearMarquee()}>Clear Marquee</Button>

                    </div>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Key</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tunes.toArray().map((tune, i) =>
                                <tr key={tune.id}>
                                    <td>{i+1}</td>
                                    <td>
                                        {!isSimplePractice && <Button
                                            bsStyle="success"
                                            style={{marginLeft: 5}}
                                            bsSize="small"
                                            className="pull-right"
                                            onClick={() => addMinute(tune)}>+1m</Button>}
                                        <Button
                                            bsStyle="warning"
                                            bsSize="small"
                                            style={{marginLeft: 5}}
                                            className="pull-right"
                                            onClick={() => completeQueueItem(tune)}><Glyphicon glyph="ok" /></Button>
                                        {/*<Button
                                                                                    bsStyle="info"
                                                                                    bsSize="small"
                                                                                    className="pull-right"
                                                                                    onClick={() => appendTuneToCurrentPlaylistSet(tune)}><Glyphicon glyph="plus" /></Button>*/}
                                        <Link to={`/my/tunes/view/${tune.id}`}>{tune.name} <TuneFlags tune={tune} spiders={areSpiders}/></Link>
                                    </td>
                                    <td>{pretty(tune.type)}</td>
                                    <td>{tune.musicKey}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        );
    }
}

function mapAppStateToProps(state) {
    return {
        tunes: state.queue.map((_, key) => state.tunes.get(key) || {}),
        areSpiders: state.areSpiders,
        isSimplePractice: state.isSimplePractice,
        routePath: state.router.location.pathname
    }
}

export default connect(
    mapAppStateToProps,
    {
        completeQueueItem: (tune) => (dispatch, getState) => {
            removeFromQueue(tune, getState().user)
        },
        addMinute: (tune) => (dispatch, getState) => {
            updateTune({
                ...tune,
                lastPracticedTimestamp: Date.now(),
                secondsPracticed: tune.secondsPracticed + 60
            }, getState().user)
        },
        appendTuneToCurrentPlaylistSet: (tune) => (dispatch, getState) => {
            appendToCurrentPlaylistSet(tune, getState().user)
        },
        nextSet: () => (dispatch, getState) => {
            moveCurrentSetToPlayed(getState().user)
        },
        clearMarquee: () => (dispatch, getState) => {
            clearPlaylists(getState().user)
        },
        pushRoute: push,
        goBack,
    }
)(TuneQueue);
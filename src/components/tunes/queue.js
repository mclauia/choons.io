import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Table, Button, Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TuneFlags } from './view'

import { pretty } from './utils';

import { push, goBack } from 'react-router-redux';

import { updateTune, removeFromQueue } from '../../firebase';

class TuneQueue extends Component {
    render() {
        const { tunes, addMinute, completeQueueItem } = this.props;
        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Queue</h1>

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
                                        <Button
                                            bsStyle="success"
                                            style={{marginLeft: 5}}
                                            bsSize="small"
                                            className="pull-right"
                                            onClick={() => addMinute(tune)}>+1m</Button>
                                        <Button
                                            bsStyle="warning"
                                            bsSize="small"
                                            className="pull-right"
                                            onClick={() => completeQueueItem(tune)}><Glyphicon glyph="ok" /></Button>
                                        <Link to={`/my/tunes/view/${tune.id}`}>{tune.name} <TuneFlags tune={tune} /></Link>
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
        routePath: state.router.location.pathname
    }
}

export default connect(
    mapAppStateToProps,
    {
        completeQueueItem: (tune) => (dispatch, getState) => {
            console.log('completed', tune.id)
            removeFromQueue(tune, getState().user)
        },
        addMinute: (tune) => (dispatch, getState) => {
            updateTune({
                ...tune,
                lastPracticedTimestamp: Date.now(),
                secondsPracticed: tune.secondsPracticed + 60
            }, getState().user)
        },
        pushRoute: push,
        goBack,
    }
)(TuneQueue);
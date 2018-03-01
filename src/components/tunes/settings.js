import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Table, Button, Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { TuneFlags } from './view'

import Toggle from 'react-bootstrap-toggle';
import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css';

import { pretty } from './utils';

import { push, goBack } from 'react-router-redux';

import { updatePublicFlag, updateSpidersFlag, updateTune, removeFromQueue } from '../../firebase';

class Settings extends Component {
    render() {
        const {
            tunes,
            addMinute,
            completeQueueItem,
            currentUserId,
            areTunesPublic,
            areSpiders
        } = this.props;

        return (
            <Row>
                <Col xs={12} md={12}>
                    <h1>Settings</h1>

                    <Row className="pad-butt"><Col xs={12} md={6}>
                        <dl className="dl-horizontal">
                            <dt className="pad-butt" ><label>Spiders</label></dt>
                            <dd><Toggle on="Yes?" off="No"
                                active={areSpiders}
                                onClick={() => {
                                    areSpiders ? this.props.setSpiders(false) : this.props.setSpiders(true);
                                }}/></dd>
                            <dt><label>Public</label></dt>
                            <dd><Toggle on="Yes" off="No"
                                active={areTunesPublic}
                                onClick={() => {
                                    areTunesPublic ? this.props.setPublic(false) : this.props.setPublic(true);
                                }}/></dd>
                        </dl>
                        <div>

                        </div>
                    </Col></Row>
                    <Row className="pad-butt"><Col xs={12} md={6}>
                        {!areTunesPublic &&
                            <Button bsStyle="warning" onClick={() => {
                                this.props.setPublic(true);
                            }}>
                                Go Public
                            </Button>
                        }
                        {areTunesPublic &&
                            <div>
                                <Button bsStyle="warning" onClick={() => {
                                    this.props.setPublic(false);
                                }}
                                >
                                    Go Private
                                </Button>
                            </div>
                        }
                    </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

function mapAppStateToProps(state) {
    return {
        currentUserId: state.user,
        areTunesPublic: state.areTunesPublic,
        areSpiders: state.areSpiders,
        routePath: state.router.location.pathname
    }
}

export default connect(
    mapAppStateToProps,
    {
        setPublic: (isPublic) => (dispatch, getState) => {
            updatePublicFlag(getState().user, isPublic);
            dispatch({ type: 'PUBLICNESS_CHANGED', payload: isPublic })
        },
        setSpiders: (spiders) => (dispatch, getState) => {
            updateSpidersFlag(getState().user, spiders);
            dispatch({ type: 'SPIDERNESS_CHANGED', payload: spiders })
        },
        pushRoute: push,
        goBack,
    }
)(Settings);
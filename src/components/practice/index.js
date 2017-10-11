// react bindings
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col,
} from 'react-bootstrap';
import { push } from 'react-router-redux';

class Practice extends Component {
    state = {
    }

    render() {
        return (
            <Row>
                <Col xs={12} md={12}>
                    hello
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
        pushRoute: push,
    }
)(Practice);

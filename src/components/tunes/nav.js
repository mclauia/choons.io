import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Button, Row, Col
} from 'react-bootstrap';

export default function TuneNav({ back, add, edit: editId, view: viewId }) {
    return <Row className="pad-butt"><Col md={12}>
        {back && <Link to="/tunes" className="pull-right"><Button>Back to All Choons</Button></Link>}
        {add && <Link to="/tunes/add"><Button bsStyle="primary">Add Tune</Button></Link>}
        {editId && <Link to={`/tunes/edit/${editId}`}><Button bsStyle="primary">Edit Tune</Button></Link>}
        {viewId && <Link to={`/tunes/view/${viewId}`}><Button>View Tune</Button></Link>}
    </Col></Row>
}

TuneNav.propTypes = {
    back: PropTypes.bool,
    add: PropTypes.bool,
    edit: PropTypes.string,
    view: PropTypes.string
}

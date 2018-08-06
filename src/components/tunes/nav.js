import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    Button, Row, Col, Glyphicon
} from 'react-bootstrap';

export default function TuneNav({ back, add, edit: editId, view: viewId, userId, queue }) {
    const isMine = userId === 'my';
    return <Row className="pad-butt"><Col md={12}>
        {back && <Link to={`/${userId}/tunes`} className="pull-right"><Button>All {`${isMine ? 'My' : 'Their'}`} Choons</Button></Link>}
        {add && isMine && <Link to={`/${userId}/tunes/add`}><Button bsStyle="primary">Add Tune</Button></Link>}
        {editId && isMine && <Link to={`/${userId}/tunes/edit/${editId}`}><Button bsStyle="primary">Edit Tune</Button></Link>}
        {viewId && <Link to={`/${userId}/tunes/view/${viewId}`}><Button>View Tune</Button></Link>}
        {' '}
        {queue && <Button
            bsStyle="primary"
            title="Add to Playlist"
            onClick={queue}><Glyphicon glyph="th-list" /></Button>}
    </Col></Row>
}

TuneNav.propTypes = {
    userId: PropTypes.string.isRequired,
    back: PropTypes.bool,
    add: PropTypes.bool,
    edit: PropTypes.string,
    view: PropTypes.string
}

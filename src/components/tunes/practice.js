import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Alert, FormGroup, InputGroup, Row, Col, Form, FormControl
} from 'react-bootstrap';
import format from 'date-fns/format';
import { updateTune } from '../../firebase';

class TunePractice extends Component {
    state = {
        isPracticing: false,
        practiceStart: null,
        practiceEnd: null,
        practiceValue: ''
    }

    startPractice = () => {
        this.setState({ isPracticing: true, practiceStart: Date.now(), practiceEnd: null })
    }
    endPractice = (learnt) => {
        const { tune } = this.props;
        const practiceEnd = Date.now();
        this.setState({ isPracticing: false, practiceEnd })
        const nextSecondsPracticed = (tune.secondsPracticed || 0) + ((practiceEnd - this.state.practiceStart) / 1000);
        const nextTune = {
            ...tune,
            lastPracticedTimestamp: practiceEnd,
            secondsPracticed: nextSecondsPracticed
        };
        if (learnt) {
            nextTune.dateLearnt = Date.now();
            nextTune.stage = 'drill';
        }
        this.props.persistTuneChanges(nextTune)
    }

    addPracticeTime = () => {
        const { tune } = this.props;
        const practiceEnd = Date.now();
        const nextSecondsPracticed = (tune.secondsPracticed || 0) + (parseFloat(this.state.practiceValue) * 60);
        const nextTune = {
            ...tune,
            lastPracticedTimestamp: practiceEnd,
            secondsPracticed: nextSecondsPracticed
        };
        this.setState({ practiceValue: '' })
        this.props.persistTuneChanges(nextTune)
    }

    persistLearnt = () => {
        this.endPractice(true);
    }

    render() {
        const { isPracticing, practiceStart, practiceEnd } = this.state;
        const { lastPracticedTimestamp, secondsPracticed, dateLearnt } = this.props.tune;

        return <Alert className="pad-butt">
            {lastPracticedTimestamp && <p>You last practiced this on {format(lastPracticedTimestamp, 'MMMM Do YYYY, h:mm A')}
                {secondsPracticed && `, for a total of ${(secondsPracticed / 60).toFixed(2)} minutes`}
            </p>}

            {!isPracticing && <Row><Col md={12}><Form horizontal>
                <InputGroup>
                    <InputGroup.Button>
                        <Button bsStyle="primary" onClick={this.startPractice}>git practicing</Button>
                    </InputGroup.Button>
                    <FormControl
                        value={this.state.practiceValue}
                        type="text"
                        onChange={(e) => this.setState({ practiceValue: e.target.value })}
                    />
                    <InputGroup.Button>
                        <Button bsStyle="success" onClick={this.addPracticeTime}>Add time</Button>
                    </InputGroup.Button>
                </InputGroup>

            </Form></Col></Row>}
            {isPracticing && <div>
                <h3>Keep practicing!</h3>
                <br />
                <Button bsStyle="success" onClick={() => this.endPractice()}>ok stop practicing</Button>
                {' '}
                {!dateLearnt && <Button bsStyle="primary" onClick={this.persistLearnt}>i lernt it</Button>}
            </div>}
            {practiceEnd && <div>
                <h3>You practiced for {((practiceEnd - practiceStart) / 1000 / 60).toFixed(2)} minutes!</h3>
            </div>}
        </Alert>
    }
}

export default connect(
    () => ({}),
    {
        persistTuneChanges: (tune) => (dispatch, getState) => {
            updateTune(tune, getState().user)
        }
    }
)(TunePractice);

// react bindings
import React from 'react';
import {
    Table
} from 'react-bootstrap';
import format from 'date-fns/format';

import TuneNav from './nav';
import TunePractice from './practice';

import {
    wasPracticedRecently,
    hasCobwebs,
    wasAddedRecently,
    wasLearntRecently,
    wasForgotten,
    isPracticedALot
} from './utils';

export default function TuneView({ tune }) {
    console.log(tune)
    return (<div>
        <h1>{tune.name} <TuneFlags tune={tune} /></h1>
        <TuneNav back={true} edit={tune.id} />
        <TunePractice tune={tune} />
        <Table striped bordered hover responsive>
            <tbody>
                <tr>
                    <td><strong>AKA</strong></td>
                    <td>{tune.aliases}</td>
                </tr>
                <tr>
                    <td><strong>Type</strong></td>
                    <td>{tune.type}</td>
                </tr>
                <tr>
                    <td><strong>Key</strong></td>
                    <td>{tune.musicKey}</td>
                </tr>
                <tr>
                    <td><strong>Stage</strong></td>
                    <td>{tune.stage}</td>
                </tr>
                <tr>
                    <td><strong>Era</strong></td>
                    <td>{tune.era}</td>
                </tr>
                <tr>
                    <td><strong>Composer</strong></td>
                    <td>{tune.composer}</td>
                </tr>
                <tr>
                    <td><strong>Date Learnt</strong></td>
                    <td>{format(tune.dateLearnt, 'MMMM Do YYYY')}</td>
                </tr>
                <tr>
                    <td><strong>Videos</strong></td>
                    <td>
                        {tune.video && <a href={tune.video}>{tune.video.includes('youtube') ? 'YouTube' : 'Video'}</a>}
                        {tune.video2 && <a href={tune.video2}>{tune.video2.includes('youtube') ? 'YouTube' : 'Video'}</a>}
                    </td>
                </tr>
                <tr>
                    <td><strong>Source</strong></td>
                    <td>{tune.source}</td>
                </tr>
                <tr>
                    <td><strong>Dots</strong></td>
                    <td>{tune.dots && <a href={tune.dots}>The dots</a>}</td>
                </tr>
                <tr>
                    <td><strong>Sessions</strong></td>
                    <td>{tune.sessions}</td>
                </tr>
                <tr>
                    <td><strong>Notes</strong></td>
                    <td>{tune.notes}</td>
                </tr>
            </tbody>
        </Table>
    </div>)
}

export function TuneFlags({ tune }) {
    return <span>
        {wasPracticedRecently(tune) && '🎻 '}
        {hasCobwebs(tune) && '🕸 '}
        {wasAddedRecently(tune) && '🌕 '}
        {wasLearntRecently(tune) && '🔰 '}
        {wasForgotten(tune) && '🌑 '}
        {isPracticedALot(tune) && '⭐ '}
    </span>
}

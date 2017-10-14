// react bindings
/* global ABCJS */
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
    isPracticedALot,
    pretty,
    renderAbcTo
} from './utils';

export default function TuneView({ tune }) {
    renderAbcTo(tune.abc, 'tuneHint')

    return (<div>
        <h1>{tune.name} <TuneFlags tune={tune} /></h1>
        <TuneNav back={true} edit={tune.id} />
        <TunePractice tune={tune} />
        <Table striped bordered hover responsive>
            <tbody>
                {!!tune.aliases && <tr>
                    <td><strong>AKA</strong></td>
                    <td>{tune.aliases}</td>
                </tr>}
                <tr>
                    <td><strong>Type</strong></td>
                    <td>{pretty(tune.type)}</td>
                </tr>
                <tr>
                    <td><strong>Key</strong></td>
                    <td>{tune.musicKey}</td>
                </tr>
                <tr>
                    <td><strong>Stage</strong></td>
                    <td>{pretty(tune.stage)}</td>
                </tr>
                {!!tune.realm && <tr>
                    <td><strong>Realm</strong></td>
                    <td>{pretty(tune.realm)}</td>
                </tr>}
                {!!tune.era && <tr>
                    <td><strong>Era</strong></td>
                    <td>{tune.era}</td>
                </tr>}
                {!!tune.composer && <tr>
                    <td><strong>Composer</strong></td>
                    <td>{tune.composer}</td>
                </tr>}
                {!!tune.dateLearnt && <tr>
                    <td><strong>Date Learnt</strong></td>
                    <td>{format(tune.dateLearnt, 'MMMM Do YYYY')}</td>
                </tr>}
                <tr>
                    <td><strong>Videos</strong></td>
                    <td>
                        {tune.video && <a href={tune.video} target="_blank" rel="noopener noreferrer">{tune.video.includes('youtube') ? 'YouTube' : 'Video'}</a>}
                        {tune.video2 && <a href={tune.video2} target="_blank" rel="noopener noreferrer">{tune.video2.includes('youtube') ? 'YouTube' : 'Video'}</a>}
                    </td>
                </tr>
                <tr>
                    <td><strong>Source</strong></td>
                    <td>{tune.source}</td>
                </tr>
                {!!tune.dots && <tr>
                    <td><strong>Dots</strong></td>
                    <td>{tune.dots && <a href={tune.dots} target="_blank" rel="noopener noreferrer">The dots</a>}</td>
                </tr>}
                {!!tune.session && <tr>
                    <td><strong>Sessions</strong></td>
                    <td>{tune.session}</td>
                </tr>}
                {!!tune.notes && <tr>
                    <td><strong>Notes</strong></td>
                    <td>{tune.notes}</td>
                </tr>}
                {!!tune.abc && <tr>
                    <td><strong>Hint</strong></td>
                    <td><div id="tuneHint"></div></td>
                </tr>}
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

// react bindings
import React from 'react';
import {
    Table, OverlayTrigger, Tooltip, Button, Alert, HelpBlock
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
    renderAbcTo,
    countCobwebs
} from './utils';

export default function TuneView({ tune, userId, onImport }) {
    renderAbcTo(tune.abc, 'tuneHint');

    const isMine = userId === 'my';

    return (<div>
        <h1>{tune.name} <TuneFlags tune={tune} /></h1>
        <TuneNav back={true} edit={tune.id} userId={userId} />
        {isMine && <TunePractice tune={tune} />}
        {!isMine && <Alert>
            <h4>Know this one? Copy it to your choons~</h4>
            <HelpBlock>
                Importing a choon will copy over its non-personal metadata (composer, key, realm, abc).
                <br />
                Things like who you got it from, which sessions you play it at, or learning and practice data are up to you.
            </HelpBlock>
            <Button bsStyle="success" onClick={() => onImport(tune)}>Import to My Choons</Button>
        </Alert>}
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
                    <td>{tune.notes.split('\n').map((line, i) => <p key={i}>{line}</p>)}</td>
                </tr>}
                {!!tune.abc && <tr>
                    <td><strong>Hint</strong></td>
                    <td>
                        <div id="tuneHint"></div>
                        <div id="tuneHintMidi"></div>
                    </td>
                </tr>}
            </tbody>
        </Table>
    </div>)
}

export function TuneFlags({ tune }) {
    return <span>
        {wasPracticedRecently(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="wasPracticedRecentlyTip">practiced on {format(tune.lastPracticedTimestamp, 'MMMM Do YYYY')}</Tooltip>}>
                <span role="img" aria-label="Practiced recently">{tune.type === 'song' ? '🎙' : '🎻'} </span>
            </OverlayTrigger>
        }
        {hasCobwebs(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="hasCobwebsTip">hasn't been practiced in {countCobwebs(tune)} weeks!</Tooltip>}>
                <span>{Array(countCobwebs(tune)).fill().map((_, i) => <span key={i} role="img" aria-label="Hasn't been practiced recently">🕸</span>)}</span>
            </OverlayTrigger>
        }
        {wasAddedRecently(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="wasAddedRecentlyTip">added on {format(tune.dateAdded, 'MMMM Do YYYY')}</Tooltip>}>
                <span role="img" aria-label="Added recently">🌕 </span>
            </OverlayTrigger>
        }
        {wasLearntRecently(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="wasLearntRecentlyTip">learnt on {format(tune.dateLearnt, 'MMMM Do YYYY')}</Tooltip>}>
                <span role="img" aria-label="Learned recently">🔰 </span>
            </OverlayTrigger>
        }
        {wasForgotten(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="wasForgottenTip">added on {format(tune.dateAdded, 'MMMM Do YYYY')}, but never learnt</Tooltip>}>
                <span role="img" aria-label="Never got learned">🌑 </span>
            </OverlayTrigger>
        }
        {isPracticedALot(tune) &&
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="isPracticedALotTip">quite a fave! practiced for {Math.round(tune.secondsPracticed / 60 / 60)} hours and counting!</Tooltip>}>
                <span role="img" aria-label="Practiced a lot">⭐ </span>
            </OverlayTrigger>
        }
    </span>
}

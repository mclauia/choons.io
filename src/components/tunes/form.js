import React from 'react';

import {
    FormControl, Well
} from 'react-bootstrap';

import { renderAbcTo } from './utils';

export function TuneTypeSelect(props) {
    return (
        <FormControl
            componentClass="select"
            {...props}
        >
            <option value="">-- Choose Type --</option>
            <option value="reel">Reel</option>
            <option value="galope">Galope</option>
            <option value="gigue">Gigue</option>
            <option value="brandy">Brandy</option>
            <option value="jig">Jig / 6/8</option>
            <option value="waltz">Waltz</option>
            <option value="hornpipe">Hornpipe</option>
            <option value="slide">Slide</option>
            <option value="slipjig">Slipjig</option>
            <option value="march">March</option>
            <option value="air">Air</option>
            <option value="barndance">Barndance</option>
            <option value="polka">Polka</option>
            <option value="7dance">7 Dance</option>
            <option value="song">Song</option>
        </FormControl>
    )
}

export function TuneKeySelect(props) {
    return (
        <FormControl
            componentClass="select"
            {...props}
        >
            <option value="">-- Choose Key --</option>
            <option value="C">C / Do</option>
            <option value="Cm">Cm / Do mineur</option>
            <option value="D">D / Re</option>
            <option value="Dm">Dm / Re mineur</option>
            <option value="E">E / Mi</option>
            <option value="Em">Em / Mi mineur</option>
            <option value="F">F / Fa</option>
            <option value="F#m">F#m 💩</option>
            <option value="Fm">Fm / Fa mineur</option>
            <option value="G">G / Sol</option>
            <option value="Gm">Gm / Sol mineur</option>
            <option value="A">A / La</option>
            <option value="Am">Am / La mineur</option>
            <option value="B">B / Ti</option>
            <option value="Bm">Bm / Ti mineur</option>
        </FormControl>
    )
}

export function TuneRealmSelect(props) {
    return (
        <FormControl
            componentClass="select"
            {...props}
        >
            <option value="">-- Choose Realm --</option>
            <option value="irish">Irish</option>
            <option value="quebecois">Québécois</option>
            <option value="acadian">Acadian</option>
            <option value="metis">Métis</option>
            <option value="canadian">Other Canadian</option>
            <option value="breton">Breton</option>
            <option value="scottish">Scottish / Cape Breton</option>
            <option value="arabic">Arabic</option>
            <option value="scandi">Scandinavian</option>
            <option value="oldtime">Oldtime</option>
            <option value="american">Other American</option>
            <option value="other">Other</option>
        </FormControl>
    )
}

export function TuneStageSelect(props) {
    return (
        <FormControl
            componentClass="select"
            {...props}
        >
            <option value="">-- Choose Stage --</option>
            <option value="learn">Learn -- don't know the tune</option>
            <option value="enhance">Work on it -- don't have the fingers down</option>
            <option value="drill">Drill it -- play it a thousand times</option>
            <option value="perform">Perform it -- you got this</option>
        </FormControl>
    )
}

export function TuneHintEditor(props) {
    renderAbcTo(props.value, 'tuneHintPreview')

    return (
        <div><FormControl
            style={{ fontFamily: 'monospace', height: 120 }}
            componentClass="textarea"
            {...props}
        />
        {props.value && <Well>
            <div id="tuneHintPreview"></div>
            <div id="tuneHintPreviewMidi"></div>
        </Well>}
        </div>
    )
}
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
            <option value="hornpipe">Hornpipe</option>
            <option value="jig">Jig</option>
            <option value="slide">Slide</option>
            <option value="slipjig">Slipjig</option>
            <option value="waltz">Waltz</option>
            <option value="march">March</option>
            <option value="air">Air</option>
            <option value="barndance">Barndance</option>
            <option value="7dance">7 Dance</option>
            <option value="gigue">Gigue</option>
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
            <option value="D">D</option>
            <option value="Dm">Dm</option>
            <option value="E">E</option>
            <option value="Em">Em</option>
            <option value="F">F</option>
            <option value="Fm">Fm</option>
            <option value="G">G</option>
            <option value="Gm">Gm</option>
            <option value="A">A</option>
            <option value="Am">Am</option>
            <option value="B">B</option>
            <option value="Bm">Bm</option>
            <option value="C">C</option>
            <option value="Cm">Cm</option>
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
            <option value="scottish">Scottish</option>
            <option value="arabic">Arabic</option>
            <option value="scandi">Scandinavian</option>
            <option value="oldtime">Oldtime</option>
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
            <option value="learn">Learn -- don't know the fingers</option>
            <option value="enhance">Work on it -- just missing some fingers</option>
            <option value="drill">Drill it -- got the fingers; play it a thousand times</option>
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
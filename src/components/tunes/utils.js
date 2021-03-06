/* global ABCJS */
import format from 'date-fns/format';
import 'abcjs/abcjs-midi.css';
import 'font-awesome/css/font-awesome.css'

export function formatTimestamp(timestamp, hour = true) {
    return format(timestamp, `MMMM Do YYYY${hour ? ', h:mm A' : ''}`);
}

// practiced in the last week
export function wasPracticedRecently(tune) {
    return (Date.now() - tune.lastPracticedTimestamp) / 1000 / 60 / 60 / 24 < 7;
}

// has not been practiced in the last week
export function hasCobwebs(tune) {
    return (Date.now() - tune.lastPracticedTimestamp) / 1000 / 60 / 60 / 24 > 7;
}

export function countCobwebs(tune) {
    return Math.floor((Date.now() - tune.lastPracticedTimestamp) / 1000 / 60 / 60 / 24 / 7);
}

// practiced in the last month
export function wasAddedRecently(tune) {
    return (Date.now() - tune.dateAdded) / 1000 / 60 / 60 / 24 < 31;
}

// was added a while ago and never learned
export function wasForgotten(tune) {
    return !tune.dateLearnt && (!tune.dateAdded || (Date.now() - tune.dateAdded) / 1000 / 60 / 60 / 24 > 31);
}

// was learned in the last month
export function wasLearntRecently(tune) {
    return (Date.now() - tune.dateLearnt) / 1000 / 60 / 60 / 24 < 31;
}

// practiced for more than 12 hours total
export function isPracticedALot(tune) {
    return tune.secondsPracticed > 12 * 60 * 60;
}

export const sort = (tunes) => ({
    by: (key, dir) => {
        return tunes.sort((a, b) => {
            if (dir === 'desc') {
                if ((!a[key] && !b[key]) || a[key] === b[key]) return 0;
                if (!b[key] || a[key] > b[key]) return -1;
                if (!a[key] || a[key] < b[key]) return 1;
                return 0
            }
            if ((!a[key] && !b[key]) || a[key] === b[key]) return 0;
            if (!b[key] || a[key] < b[key]) return -1;
            if (!a[key] || a[key] > b[key]) return 1;
            return 0;
        })
    }
})

export function getSortForFlags(flags) {
    switch (flags) {
        case '🔰': {
            return ['dateLearnt', 'desc']
        }
        case '🎻': {
            return ['lastPracticedTimestamp', 'desc']
        }
        case '🌕': {
            return ['dateAdded', 'desc']
        }
        case '🕸': {
            return ['lastPracticedTimestamp', 'asc']
        }
        case '🌑': {
            return ['dateAdded', 'desc']
        }
        case '⭐': {
            return ['name', 'asc']
        }
        default: {
            return ['name', 'asc'];
        }
    }
}

export const filter = (tunes) => ({
    byKey: (filterKey, filterValue) => {
        switch (filterKey) {
            case 'flags': {
                return tunes.filter(tune => tune[filterKey].includes(filterValue))
            }
            default: {
                return tunes.filter(tune => tune[filterKey] === filterValue)
            }
        }
    },
    byFlags: (flags) => {
        return Array.from(flags).reduce((prev, flag) => {
            switch (flag) {
                case '🔰': {
                    return prev.filter(wasLearntRecently)
                }
                case '🎻': {
                    return prev.filter(wasPracticedRecently)
                }
                case '🌕': {
                    return prev.filter(wasAddedRecently)
                }
                case '🕸': {
                    return prev.filter(hasCobwebs)
                }
                case '🌑': {
                    return prev.filter(wasForgotten)
                }
                case '⭐': {
                    return prev.filter(isPracticedALot)
                }
                default: {
                    return prev;
                }
            }
        }, tunes)
    }
})

export function renderAbcTo(abc, targetId, options) {
    if (abc) {
        // i have no idea how to interop this with react, sooo
        setTimeout(() => {
            ABCJS.renderAbc(targetId, abc, {}, { scale: 0.7, ...options })
            ABCJS.renderMidi(targetId + 'Midi', abc, {
                inlineControls: {
                    selectionToggle: false,
                    loopToggle: false,
                    standard: true,
                    tempo: false,
                    startPlaying: false
                }
            })
        }, 300)
    };
}

export function getDefaultHintFor(type, musicKey) {
    var timeSig;
    switch(type) {
        case 'jig':
            timeSig = '6/8';
            break;
        case 'slide':
            timeSig = '12/8';
            break;
        case 'slipjig':
            timeSig = '9/8';
            break;
        case 'waltz':
            timeSig = '3/4';
            break;
        case '7dance':
            timeSig = '7/4';
            break;
        default:
            timeSig = '4/4';
    }
    return `M: ${timeSig}
K: ${musicKey}
| | |`
}

export function pretty(key) {
    return pretty.texts[key] || key;
}

pretty.texts = {
    lastPracticedTimestamp: 'Last Practiced',
    dateLearnt: 'Date Learnt',
    dateAdded: 'Date Added',
    source: 'Source',
    session: 'Session',

    reel: 'Reel',
    hornpipe: 'Hornpipe',
    jig: 'Jig / 6/8',
    slide: 'Slide',
    slipjig: 'Slipjig',
    waltz: 'Waltz',
    march: 'March',
    air: 'Air',
    barndance: 'Barndance',
    '7dance': '7 Dance',
    gigue: 'Gigue',
    song: 'Song',
    galope: 'Galope',
    brandy: 'Brandy',
    waltz: 'Waltz',
    polka: 'Polka',

    irish: 'Irish',
    quebecois: 'Québécois',
    arabic: 'Arabic',
    oldtime: 'Oldtime',
    scandi: 'Scandinavian',
    other: 'Other',
    acadian: 'Acadian',
    metis: 'Métis',
    canadian: 'Other Canadian',
    breton: 'Breton',
    scottish: 'Scottish / Cape Breton',
    american: 'Other American',

    learn: 'Learn it',
    drill: 'Drill it',
    enhance: 'Work on it',
    perform: 'Perform it',
    embellish: 'Embellish it'
}
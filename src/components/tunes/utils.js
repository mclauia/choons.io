// practiced in the last week
export function wasPracticedRecently(tune) {
    return (Date.now() - tune.lastPracticedTimestamp) / 1000 / 60 / 60 / 24 < 7;
}

// has not been practiced in the last month
export function hasCobwebs(tune) {
    return (Date.now() - tune.lastPracticedTimestamp) / 1000 / 60 / 60 / 24 > 31;
}

// practiced in the last month
export function wasAddedRecently(tune) {
    return (Date.now() - tune.dateAdded) / 1000 / 60 / 60 / 24 < 31;
}

// was added a long time ago and never learned
export function wasForgotten(tune) {
    return !tune.dateLearnt && (Date.now() - tune.dateAdded) / 1000 / 60 / 60 / 24 > 31;
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
    by: (...keys) => {
        return keys.reduce((prev, key) => {
            return prev.sort((a, b) => {
                if ((!a[key] && !b[key]) || a[key] === b[key]) return 0;
                if (!b[key] || a[key] < b[key]) return -1;
                if (!a[key] || a[key] > b[key]) return 1;
            })
        }, tunes)
    }
})

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

import { getUserTuneList, pushNewTune } from '../../firebase';

export function fetchReadList(userId) {
    return (dispatch) => {
        getUserTuneList(userId).then((tunes) => {
            dispatch({ type: 'GOT_READ_TUNES', payload: {
                tunes,
                userId
            }})
        });
    }
}

export function importTune(tune) {
    return (dispatch, getState) => {
        const newTune = {
            source: `Imported from a friend's choons list`,
        };
        if (tune.abc) newTune.abc = tune.abc;
        if (tune.aliases) newTune.aliases = tune.aliases;
        if (tune.composer) newTune.composer = tune.composer;
        if (tune.dots) newTune.dots = tune.dots;
        if (tune.era) newTune.era = tune.era;
        if (tune.musicKey) newTune.musicKey = tune.musicKey;
        if (tune.name) newTune.name = tune.name;
        if (tune.realm) newTune.realm = tune.realm;
        if (tune.type) newTune.type = tune.type;
        if (tune.video) newTune.video = tune.video;
        if (tune.video2) newTune.video2 = tune.video2;

        pushNewTune(newTune, getState().user);

        dispatch({
          type: 'TUNE_IMPORTED',
        })
    }
}
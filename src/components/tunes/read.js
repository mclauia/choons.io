import { getUserTuneList } from '../../firebase';

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
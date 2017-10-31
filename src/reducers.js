import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Map } from 'immutable';

export default combineReducers({
    // stores route state
    router: routerReducer,
    tunes: (state = Map({}), action) => {
        switch (action.type) {
            case 'GOT_TUNES':
                return Map(action.payload);
            case 'GOT_TUNE':
                const itemId = action.payload.id;
                return state.set(itemId, action.payload);
            default:
                return state;
        }
    },
    readTunes: (state = Map({}), action) => {
        switch (action.type) {
            case 'GOT_READ_TUNES':
                return state.set(action.payload.userId, Map(action.payload.tunes));
            default:
                return state;
        }
    },
    user: (state = {}, action) => {
        switch (action.type) {
            case 'USER_AUTHED':
                return action.payload;
            default:
                return state;
        }
    },
    messages: (state = '', action) => {
        switch (action.type) {
            case '@@router/LOCATION_CHANGE':
                return '';
            case 'TUNE_IMPORTED':
                return 'Tune copied to your Choons list!'
            default:
                return state;
        }
    },
});

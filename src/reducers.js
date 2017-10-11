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
    }
});

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { Map, Set } from 'immutable';

export default combineReducers({
    // stores route state
    router: routerReducer,
    areTunesPublic: (state = false, action) => {
        switch (action.type) {
            case 'GOT_PUBLICNESS':
                return action.payload;
            default:
                return state;
        }
    },
    areSpiders: (state = false, action) => {
        switch (action.type) {
            case 'GOT_SPIDERNESS':
                return action.payload;
            default:
                return state;
        }
    },
    tunes: (state = Map({}), action) => {
        switch (action.type) {
            case 'GOT_TUNES':
                return Map(action.payload);
            case 'GOT_TUNE': {
                const itemId = action.payload.id;
                return state.set(itemId, action.payload);
            }
            case 'DELETED_TUNE': {
                const itemId = action.payload.id;
                return state.delete(itemId);
            }
            default:
                return state;
        }
    },
    queue: (state = Map({}), action) => {
        switch (action.type) {
            case 'GOT_QUEUE':
                return Map(action.payload);
            case 'QUEUE_CHANGED':
                return state.has(action.payload) ? state.delete(action.payload) : state.set(action.payload, true);
            case 'DELETED_FROM_QUEUE':
            console.log('delete',action.payload);
                return state.delete(action.payload);
            default:
                return state;
        }
    },
    sessions: (state = Set(), action) => {
        switch (action.type) {
            case 'GOT_TUNES':
                return Object.values(action.payload).reduce(
                    (set, tune) => tune.session ? set.add(tune.session) : set, Set()
                );
            case 'GOT_TUNE':
                return action.payload.session ? state.add(action.payload.session) : state
            default:
                return state;
        }
    },
    sources: (state = Set(), action) => {
        switch (action.type) {
            case 'GOT_TUNES':
                return Object.values(action.payload).reduce(
                    (set, tune) => tune.source ? set.add(tune.source) : set, Set()
                );
            case 'GOT_TUNE':
                return action.payload.source ? state.add(action.payload.source) : state
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
    user: (state = '', action) => {
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
                return 'Choon copied to your Choons list!'
            case 'TUNE_SAVED':
                return 'Choon saved!'
            case 'URL_COPIED':
                return 'Copied URL to clipboard!'
            case 'PUBLICNESS_CHANGED':
                return `Choons are now ${action.payload ? 'public' : 'private'}!`
            case 'SPIDERNESS_CHANGED':
                return `Choons are now ${action.payload ? 'full of spiders' : 'spider-free'}!`
            default:
                return state;
        }
    },
});

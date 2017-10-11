import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import reducer from './reducers';
import { initAuthApp } from './firebase';

import App from './components/app';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const middleware = [ thunk, historyMiddleware ];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
        collapsed: true
    }));
}

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
)

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'))

initAuthApp(store.dispatch)

registerServiceWorker();

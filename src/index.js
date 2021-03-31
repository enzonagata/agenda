import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';
import Routes from './Routes';

import './css/custom.css';

//Reducers
import userReducer from './redux/reducers/userReducer';

const rootElement = document.getElementById('root')

// Add the sessionReducer
const reducer = combineReducers({
    user: userReducer,
    session: sessionReducer
});

const store = createStore(reducer, undefined, compose(applyMiddleware(thunkMiddleware)));

const validateSession = (session) => {
    sessionService.saveUser(session).catch(err => console.error(err));
    return true;
}
const options = { refreshOnCheckAuth: true, redirectPath: '/login', driver: 'COOKIES', validateSession };
// Init the session service
sessionService.initSessionService(store, options);

render(
    <Provider store={store}>
        <Routes />
    </Provider>, rootElement)
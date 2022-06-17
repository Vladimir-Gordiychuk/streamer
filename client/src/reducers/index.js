import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { USER_AUTH } from '../actions/types';

const INITIAL_AUTH = {
    isSignedIn: null,
    id: null
};

const authReducer = (auth = INITIAL_AUTH, action) => {
    switch (action.type) {
        case USER_AUTH:
            return action.payload;
        default:
            return auth;
    }
};

export default combineReducers({
    auth: authReducer,
    form: formReducer
});
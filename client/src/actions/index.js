import { USER_AUTH } from './types';

export const setSignIn = (isSignedIn, id) => {
    return {
        type: USER_AUTH,
        payload: {
            isSignedIn,
            id
        }
    };
};
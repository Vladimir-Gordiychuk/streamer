import { USER_AUTH, STREAM_CREATE } from './types';

import streamer from '../apis/streamer';

export const setSignIn = (isSignedIn, id) => {
    return {
        type: USER_AUTH,
        payload: {
            isSignedIn,
            id
        }
    };
};

export const createStream = (stream) => async dispatch => {
    await streamer.createStream(stream);
    dispatch({
        type: STREAM_CREATE,
        payload: {
            stream
        }
    });
}
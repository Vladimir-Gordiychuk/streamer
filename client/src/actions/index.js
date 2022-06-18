import history from '../history';
import streamer from '../apis/streamer';

import {
    USER_AUTH,
    STREAMS_FETCH,
    STREAM_CREATE,
    STREAM_FETCH,
    STREAM_DELETE,
    STREAM_UPDATE
} from './types';

export const setSignIn = (isSignedIn, id) => {
    return {
        type: USER_AUTH,
        payload: {
            isSignedIn,
            id
        }
    };
};

export const createStream = (stream) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    if (!userId)
        return;
    const createdStream = await streamer.createStream({
        ...stream, userId
    });
    dispatch({
        type: STREAM_CREATE,
        payload: createdStream
    });
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const streams = await streamer.getStreams();
    dispatch({
        type: STREAMS_FETCH,
        payload: streams
    });
};

export const fetchStream = (id) => async dispatch => {
    const stream = await streamer.getStream(id);
    dispatch({
        type: STREAM_FETCH,
        payload: stream
    });
};

export const updateStream = (stream) => async dispatch => {
    const responseStream = await streamer.updateStream(stream);
    dispatch({
        type: STREAM_UPDATE,
        payload: responseStream
    });
};

export const deleteStream = (id) => async dispatch => {
    await streamer.deleteStream(id);
    dispatch({
        type: STREAM_DELETE,
        payload: id
    });
};
import _ from 'lodash';

import {
    STREAMS_FETCH,
    STREAM_CREATE,
    STREAM_FETCH,
    STREAM_DELETE,
    STREAM_UPDATE
} from '../actions/types';

const streamArrayReducer = (streams = [], action) => {
    switch (action.type) {
        case STREAM_CREATE:
            return [...streams, action.payload];
        case STREAMS_FETCH:
            return action.payload;
        case STREAM_UPDATE:
            const targetId = action.payload.id;
            return streams.map(stream => stream.id === targetId ?
                action.payload : stream);
        case STREAM_FETCH:
            const fetchedStream = action.payload;
            return [
                ...streams
                    .filter(stream => stream.id !== fetchedStream.id),
                fetchedStream
            ];
        case STREAM_DELETE:
            const deletedId = action.payload;
            return streams.filter(stream => stream.id !== deletedId);

        default:
            return streams;
    }
}

const streamsReducer = (streams = {}, action) => {
    switch (action.type) {
        case STREAMS_FETCH:
            return _.mapKeys(action.payload, 'id');
        case STREAM_CREATE:
        case STREAM_UPDATE:
        case STREAM_FETCH:
            return {
                ...streams,
                [action.payload.id]: action.payload
            };
        case STREAM_DELETE:
            _.omit(streams, action.payload);

        default:
            return streams;
    }
}

export default streamsReducer;
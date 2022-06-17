import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3001'
});

/**
 * Get list of all streams.
 */
const getStreams = async () => {
    const response = await api.get('/streams');
    if (response.error) {
        throw Error(response.error);
    }
    return response.data;
}

/**
 * Get specific stream by id.
 * @param {number} id Stream id.
 */
const getStream = async (id) => {
    const response = await api.get(`/streams/${id}`);
    if (response.error) {
        throw Error(response.error);
    }
    return response.data;
}

/**
 * Create new stream object.
 * @param {{ title: string, description : string}} stream Stream object.
 */
const createStream = async (stream) => {
    const response = await api.post('/streams', stream);
    if (response.error) {
        throw Error(response.error);
    }
};

export default {
    api,
    getStreams,
    createStream
};
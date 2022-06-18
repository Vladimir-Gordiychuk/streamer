import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3001'
});

export default {
    api,

    /**
     * Get list of all streams.
     * @returns {Promise<[]>}
     */
    getStreams : async () => {
        const response = await api.get('/streams');
        if (response.error) {
            throw Error(response.error);
        }
        return response.data;
    },

    /**
     * Get specific stream by id.
     * @param {number} id Stream id.
     * @returns {Promise<{id: number, userId: string, title: string, description: string}>}
     */
    getStream: async (id) => {
        const response = await api.get(`/streams/${id}`);
        if (response.error) {
            throw Error(response.error);
        }
        return response.data;
    },

    /**
     * Create new stream object.
     * @param {{ userId: string, title: string, description : string}} stream Stream object.
     * @returns {Promise<{id: number, userId: string, title: string, description: string}>} Returns newly created stream record (with id).
     */
    createStream : async (stream) => {
        const response = await api.post('/streams', stream);
        if (response.error) {
            throw Error(response.error);
        }
        return response.data;
    },

    /**
     * Updates existing stream object (entirely).
     * @param {{ id: number, userId: string, title: string, description : string}} stream Updated stream object.
     * @returns {Promise<{id: number, userId: string, title: string, description: string}>} Updated stream object.
     */
    updateStream: async (stream) => {
        const response = await api.put(`/streams/${stream.id}`, stream);
        if (response.error) {
            throw Error(response.error);
        }
        return response.data;
    },

    /**
     * Update specific properties of the stram object.
     * @param {number} id An id othe stream to update.
     * @param {{ userId: string, title: string, description : string}} stream 
     * An object with the list of properties to update. All properties are optional.
     */
    patchStream: async (id, stream) => {
        const response = await api.patch(`/streams/${id}`, stream);
        if (response.error) {
            throw Error(response.error);
        }
        return response.data;
    },

    /**
     * Deletes existing stream object using specified stream id.
     * @param {number} id Id of the stream to delete.
     */
    deleteStream: async (id) => {
        const response = await api.delete(`/streams/${id}`);
        if (response.error) {
            throw Error(response.error);
        }
    },
};
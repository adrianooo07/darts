import axios from 'axios';

const api = axios.create({
    baseURL: 'https://darts.sulla.hu'
});

export const getDarts = () => api.get('/darts');
export const getDart = (id) => api.get('/darts/' + id);
export const createDart = (data) => api.post('/darts', data);
export const updateDart = (id, data) => api.put('/darts/' + id, data);
export const deleteDart = (id) => api.delete('/darts/' + id);

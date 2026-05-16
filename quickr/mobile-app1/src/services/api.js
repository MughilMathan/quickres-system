import axios from 'axios';
import { BASE_URL } from '../constants';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getMenu = () => api.get('/api/menu');
export const getTableSession = (tableId) => api.get(`/api/table/${tableId}/session`);
export const placeOrder = (orderData) => api.post('/api/orders', orderData);
export const clearSession = (orderId) => api.patch(`/api/orders/${orderId}/session-clear`);
export const getQR = () => api.get('/api/settings/qr');

export default api;

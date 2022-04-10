import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
});

export default {
  getOrders() {
    return apiClient.get('/orders');
  },

  saveOrder(order) {
    if (order) {
      return apiClient.post('/save', order);
    }
  },
};

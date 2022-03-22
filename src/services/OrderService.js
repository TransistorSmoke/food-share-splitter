import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
});

export default {
  getOrders() {
    // console.log('hello world, hey there');
    return apiClient.get('/orders');
  },

  // saveOrders(order) {
  //   if (order) {
  //     apiClient.post('/')
  //   }
  // }
};

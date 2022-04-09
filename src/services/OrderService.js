import axios from 'axios';
import { useField } from 'vee-validate';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
});

const errorMessages = {
  errorDate: null,
  errorFoodItem: null,
  errorPrice: null,
  errorShareCount: null,
};

export default {
  getOrders() {
    // console.log('hello world, hey there');
    return apiClient.get('/orders');
  },

  saveOrder(order) {
    if (order) {
      return apiClient.post('/save', order);
    }
  },

  validateForm(order) {
    if (order) {
      if (
        !order.dateOrdered ||
        order.dateOrdered.trim.length === 0 ||
        (!(order.dateOrdered instanceof Date) && isNaN(order.dateOrdered))
      ) {
        this.validForm.isInvalidDate = true;
        this.errorMessages.errorDate = 'Please enter valid date.';
      }
    }
  },
};

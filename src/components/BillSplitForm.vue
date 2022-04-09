<template>
  <div class="bill-form-container">
    <form class="bill-form" @submit.prevent="submitForm($event)">
      <div class="bill-form-component">
        <h1>Calculate Your Share</h1>
        <p>Enjoy your food, then pay your share.</p>
      </div>

      <div class="form-validation-message">
        <p>Please fill out</p>
      </div>

      <div class="bill-form-component">
        <label>Date</label>
        <input type="date" v-model="order.dateOrdered" placeholder="Date Ordered" max="" />
        <label>Item</label>
        <input v-model="order.foodItem" placeholder="Food item" />

        <label>Price</label>
        <input v-model="order.price" placeholder="Price" />

        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
// import OrderService from '@/services/OrderService';

export default {
  name: 'BillSplitForm',
  data() {
    return {
      order: {
        dateOrdered: null,
        foodItem: null,
        price: null,
      },
      orderList: [],
      validForm: {
        isInvalidDate: false,
        isInvalidItem: false,
        isInvalidPrice: false,
      },
    };
  },
  methods: {
    submitForm(e) {
      console.log(this.order);
      console.log(this.order.dateOrdered);
      console.log(this.order.foodItem);
      console.log(this.order.price);

      const isValidExpensesData =
        this.order?.dateOrdered && this.order?.foodItem && this.order?.price;

      if (isValidExpensesData) {
        this.emitter.emit('emit-expenses', this.order);
        e.target.reset();
        e.target.blur();

        // Save the order, clear the form
        // OrderService.saveOrder(this.order)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        this.order = {};
      } else {
        // Display validation messages or errors
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bill-form-container {
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #e4f7ed;

  .bill-form {
    padding-bottom: 32px;

    .bill-form-component {
      display: flex;
      flex-direction: column;
      align-items: center;

      label {
        display: flex;
        align-self: flex-start;
        width: 100%;
        font-weight: bold;
        margin-top: 16px;
      }

      input {
        width: 100%;
        padding: 10px 4px;
        border: 2px solid #eee;
        transition: border 0.3s;

        &[type='date'] {
          font-family: inherit;
        }

        &:focus {
          outline: none;
          border: 2px solid #bddfcd;
          transition: border 0.3s;
        }
      }

      button {
        border: none;
        background-color: #f4807b;
        color: white;
        width: 100%;
        height: 40px;
        margin-top: 32px;

        font-size: 0.95rem;
        font-weight: bold;
        transition: background-color 0.3s;

        &:hover {
          background-color: #ff4c46;
          transition: background-color 0.3s;
        }
      }

      .form-price {
        span {
          display: inline-block;
          border: 1px solid red;
        }

        input {
          display: inline-block;
        }
      }
    }
  }
}
</style>

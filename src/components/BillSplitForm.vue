<template>
  <div class="bill-form-container">
    <form class="bill-form" @submit.prevent="submitForm($event)">
      <div class="bill-form-component">
        <h1>Enter Your Order Details</h1>
        <p>Enjoy your food, then pay your share.</p>
      </div>

      <div class="bill-form-component">
        <label>Date</label>
        <input type="date" v-model="order.dateOrdered" placeholder="Date Ordered" max="" />
        <p class="error-message" v-if="this.orderFormFields.isInvalidDate">
          Please enter a valid date
        </p>

        <label>Item</label>
        <input v-model="order.foodItem" placeholder="Food item" />
        <p class="error-message" v-if="this.orderFormFields.isInvalidItem">
          Please enter a valid item
        </p>

        <label>Price</label>
        <input v-model="order.price" placeholder="Price" @keydown="numericInputOnly($event)" />
        <p class="error-message" v-if="this.orderFormFields.isInvalidPrice">
          Please enter a valid price
        </p>

        <div class="share-paid-by">
          <div class="share-label">
            <p>Ordered by:</p>
          </div>

          <div class="share-select">
            <div class="share-input-group">
              <input type="radio" id="bb" name="paid-by" checked />
              <label for="bb">BB</label>
            </div>
            <div class="share-input-group">
              <input type="radio" id="ate" name="paid-by" />
              <label for="ate">Ate</label>
            </div>
          </div>
        </div>

        <button class="submit" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import HelperService from '@/services/HelperService';
// import RequestsService from '@/services/RequestsService';

export default {
  name: 'BillSplitForm',
  data() {
    return {
      name: null,
      order: {
        dateOrdered: null,
        foodItem: null,
        price: null,
      },
      orderList: [],
      orderFormFields: {
        isInvalidDate: false,
        isInvalidItem: false,
        isInvalidPrice: false,
      },
      isValidOrdersData: false,
    };
  },

  methods: {
    submitForm(event) {
      this.isValidOrdersData = HelperService.validateForm(this.order, this.orderFormFields);

      if (this.isValidOrdersData) {
        this.emitter.emit('emit-expenses', this.order);
        event.target.reset();
        event.target.blur();
        // Save the order....
        // OrderService.saveOrder(this.order)
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        // ....then clear the form
        this.order = {};
      }
    },
    numericInputOnly(e) {
      /*
       *   The method prevents the following actions when inputting on the PRICE field:
       *     - input of non-numeric characters EXCEPT for those listed in the array of allowed keys
       *     - input of the zero or fullstop character as a first character in the field
       */
      const allowedKeys = [
        'Backspace',
        'Enter',
        'ArrowRight',
        'ArrowLeft',
        '.',
        'Delete',
        'Meta',
        'v',
      ];
      const patternNumbers = /^\d+$/;

      if (
        (!patternNumbers.test(e.key) && allowedKeys.indexOf(e.key) === -1) ||
        ((e.key === '0' || e.key === '.') &&
          (e.target.value.length === 0 || e.target.selectionStart === 0))
      ) {
        e.preventDefault();
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
  }
}

.bill-form-component {
  display: flex;
  flex-direction: column;
  align-items: center;

  .error-message {
    margin: 0;
    font-size: 0.75rem;
    align-self: flex-start;
    color: #ff4c46;
  }

  label {
    display: flex;
    align-self: flex-start;
    width: 100%;
    font-weight: bold;
    margin-top: 10px;
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

  .submit {
    border: none;
    background-color: #f4807b;
    color: white;
    width: 100%;
    height: 45px;
    margin-top: 32px;
    border-radius: 10px;
    text-transform: uppercase;

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

  .share-paid-by {
    border: 1px solid #f2f2f2;
    background-color: #fff;
    width: 100%;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .share-label p {
      font-weight: bold;
      margin-left: 8px;
    }

    .share-input-group {
      display: inline-block;
      margin-right: 8px;

      &:first-child {
        margin-right: 22px;
      }

      input,
      label {
        display: inline;
        width: auto;
        font-weight: normal;
      }

      input {
        margin-right: 4px;
      }
    }
  }
}
</style>

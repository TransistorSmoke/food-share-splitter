<template>
  <div class="bill-history">
    <h1>Order History</h1>
    <p class="bill-month">
      Orders for month of <span>{{ this.getMonthYear }}</span>
    </p>

    <div class="bill-history-list">
      <div class="bill-history-table">
        <table>
          <thead class="tbl-head">
            <tr class="tbl-head-row">
              <th class="tbl-cell-date">Date</th>
              <th class="tbl-cell-item">Item</th>
              <th class="tbl-cell-price">Price</th>
              <th class="tbl-cell-share">Share Per Group</th>
            </tr>
          </thead>
          <tbody class="tbl-body">
            <tr v-for="(item, index) in this.shareList" :key="index">
              <td class="tbl-cell-date">{{ item.dateOrdered }}</td>
              <td class="tbl-cell-item">{{ item.foodItem }}</td>
              <td class="tbl-cell-price">$ {{ item.price }}</td>
              <td class="tbl-cell-share">$ {{ calculateShares(item.price, item.shareCount) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-shares" v-if="this.shareList.length > 0">
          <p class="material-icons">request_quote</p>
          <p class="share-text">Total payable per group:</p>
          <p class="share-value">
            <span>$ {{ calculateTotalShares() }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import OrderService from '@services/OrderService';

export default {
  name: 'BillOrderHistory',
  data() {
    return {
      shareItem: null,
      shareList: [],
      listMonth: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      currentDate: new Date(),
    };
  },
  methods: {
    calculateShares(price) {
      return price ? (price / 2).toFixed(2) : 0;
    },

    calculateTotalShares() {
      let totalSharePerPerson = 0;
      this.shareList.forEach((share) => {
        totalSharePerPerson += Number(this.calculateShares(share.price));
      });

      if (totalSharePerPerson) {
        return totalSharePerPerson.toFixed(2);
      }
    },
  },
  computed: {
    getMonthYear() {
      return `${this.listMonth[this.currentDate?.getMonth()]} ${this.currentDate?.getFullYear()}`;
    },
  },
  mounted() {
    this.emitter.on('emit-expenses', (order) => {
      this.shareList = [...this.shareList, order];
    });

    // Display all the data from the database into the table here
  },
};
</script>

<style lang="scss" scoped>
.bill-history {
  display: flex;
  flex-direction: column;
  padding: 32px;
  width: 100%;
  min-height: 100%;
  background-color: #f0ecf0;

  &-list {
    border: 2px solid #bddfcd;
    padding: 8px;
    background-color: #fff;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: 0px 0px 6px 0px #cccccc;
      transition: box-shadow 0.3s;
    }
  }
}

.bill-month {
  font-weight: bold;
  font-size: 24px;

  span {
    text-transform: uppercase;
    text-decoration: underline;
    color: rgba(44, 62, 80, 0.8);
    border-radius: 5px;
  }
}

.bill-history-table {
  display: flex;
  flex-direction: column;
  height: 100%;

  table {
    border-collapse: collapse;
    width: 100%;
    font-size: 0.85rem;

    .tbl-cell-date {
      width: 15%;
    }
    .tbl-cell-price {
      width: 15%;
    }
    .tbl-cell-share {
      width: 20%;
    }
    .tbl-cell-count {
      width: 10%;
    }

    td.tbl-cell-item {
      text-align: left;
      text-transform: capitalize;
    }
  }

  .tbl-head-row {
    background-color: #17ca6b;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;

    th {
      padding: 10px;
      border: 1px solid white;
      color: white;
    }
  }

  .tbl-body {
    tr {
      &:nth-of-type(odd) {
        background-color: #f4fcf8;
      }
      &:nth-of-type(even) {
        background-color: #e0f1e9;
      }
    }
    td {
      padding: 10px;
      border: 1px solid #fff;

      &:first-child {
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }
    }
  }

  .total-shares {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;

    .material-icons {
      font-size: 32px;
      color: rgba(0, 0, 0, 0.5);
    }

    .share-text,
    .share-value {
      display: flex;
      align-items: center;
    }

    .share-text {
      margin: 0 4px;
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 700;
    }

    .share-value span {
      width: 120px;
      justify-content: center;
      font-size: 24px;
      font-weight: bold;
      padding: 8px;
      margin: 0 8px;
      border-radius: 4px;
      background-color: #efefef;
      border: 1px solid #f1f1f1;

      color: #353535;
    }
  }
}
</style>

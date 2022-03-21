<template>
  <div class="bill-history">
    <h1>Order History</h1>
    <p>Track your order and payment share here</p>

    <div class="bill-history-list">
      <div class="bill-history-table">
        <table>
          <thead class="tbl-head">
            <tr class="tbl-head-row">
              <th class="tbl-cell-date">Date</th>
              <th class="tbl-cell-item">Item</th>
              <th class="tbl-cell-price">Price</th>
              <th class="tbl-cell-count">Shares</th>
              <th class="tbl-cell-share">Share Per Person</th>
            </tr>
          </thead>
          <tbody class="tbl-body">
            <tr v-for="(item, index) in this.shareList" :key="index">
              <td class="tbl-cell-date">{{ item.dateOrdered }}</td>
              <td class="tbl-cell-item">{{ item.foodItem }}</td>
              <td class="tbl-cell-price">$ {{ item.price }}</td>
              <td class="tbl-cell-count">{{ item.shareCount }}</td>
              <!-- <td class="tbl-cell-share">{{ calculateShares(item.price, item.shareCount) }}</td> -->
              <td class="tbl-cell-share">$ {{ calculateShares(item.price, item.shareCount) }}</td>
            </tr>
          </tbody>
        </table>

        <div class="total-shares" v-if="this.shareList.length > 0">
          <span>Share Per Person: </span>
          <span>$ {{ calculateTotalShares() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BillOrderHistory',
  data() {
    return {
      shareItem: null,
      shareList: [],
    };
  },
  methods: {
    calculateShares(price, count) {
      return price && count ? (price / count).toFixed(2) : 0;
    },

    calculateTotalShares() {
      let totalSharePerPerson = 0;
      this.shareList.forEach((share) => {
        totalSharePerPerson += Number(this.calculateShares(share.price, share.shareCount));
      });

      if (totalSharePerPerson) {
        return totalSharePerPerson.toFixed(2);
      }
    },
  },
  mounted() {
    this.emitter.on('emit-expenses', (expense) => {
      this.shareList = [...this.shareList, expense];
    });
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
        margin-top: 30px;
        display: flex;

        span {
          font-weight: bold;
          padding: 8px 16px;
          color: #08ac54;
          text-align: right;

          &:first-child {
            flex-grow: 4;
            text-transform: uppercase;
          }

          &:nth-child(2) {
            flex-grow: 1;
            padding-right: 16px;
            background-color: #414141;
            color: white;
          }
        }
      }
    }
  }
}
</style>

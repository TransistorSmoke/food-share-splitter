<template>
  <div class="main-title">
    <h1>Hello! Eat some food, but pay for it too!</h1>
  </div>

  <div class="bill-components">
    <BillSplitForm />
    <BillOrderHistory />
  </div>
</template>

<script>
import BillSplitForm from './components/BillSplitForm';
import BillOrderHistory from './components/BillOrderHistory';

export default {
  components: {
    BillSplitForm,
    BillOrderHistory,
  },
};
</script>

<style lang="scss" scoped>
.main-title {
  width: 100%;
  margin-bottom: 16px;
}

.bill-components {
  display: flex;
  min-width: 100%;
  justify-content: center;

  padding: 32px;
}
</style>

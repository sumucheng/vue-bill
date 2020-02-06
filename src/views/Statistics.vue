<template>
  <Layout :handleExpend="handleExpend" :handleIncome="handleIncome">
    <Tabs />
    <Bill v-for="bill in displayBills" :key="bill.count" :bill="bill" />
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/statistics/Tabs.vue";
import Bill from "@/components/statistics/Bill.vue";
export default {
  components: { Bill, Tabs },
  data() {
    return {
      displayBills: this.$store.getters.expendBills
    };
  },
  methods: {
    handleExpend() {
      this.displayBills = this.$store.getters.expendBills;
    },
    handleIncome() {
      this.displayBills = this.$store.getters.incomeBills;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
</style>
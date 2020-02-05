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
      bills: [
        { type: "expend", count: 100, time: "", label: "餐饮" },
        { type: "income", count: 3000, time: "", label: "工资" },
        { type: "expend", count: 10, time: "", label: "交通", note: "地铁" }
      ],
      displayBills: [{}]
    };
  },
  methods: {
    handleExpend() {
      this.displayBills = this.bills.filter(el => el.type === "expend");
    },
    handleIncome() {
      this.displayBills = this.bills.filter(el => el.type === "income");
    }
  },
  created: function() {
    this.handleExpend();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
</style>
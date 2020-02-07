<template>
  <Layout :type.sync="type">
    <Tabs />
    <div class="billList">
      <Bill v-for="bill in displayBills" :key="bill.count" :bill="bill" />
    </div>
  </Layout>
</template>

<script lang="ts">
import Tabs from "@/components/statistics/Tabs.vue";
import Bill from "@/components/statistics/Bill.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
@Component({
  components: { Tabs, Bill }
})
export default class Statistics extends Vue {
  billList: Bill[] = JSON.parse(
    window.localStorage.getItem("billList") || "[]"
  );
  expendBills = this.billList.filter(bill => bill.type === "expend");
  incomeBills = this.billList.filter(bill => bill.type === "income");
  displayBills = this.expendBills;
  type = "expend";
  @Watch("type")
  onTypeChanged() {
    this.displayBills =
      this.type === "expend" ? this.expendBills : this.incomeBills;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.billList {
  max-height: 90%;
  overflow: auto;
}
</style>
<template>
  <Layout :type.sync="type">
    <div class="billList">
      <BillItem v-for="bill in displayBills" :key="bill.count" :bill="bill" />
    </div>
  </Layout>
</template>

<script lang="ts">
import BillItem from "@/components/statistics/Bill.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import billsModel from "@/model/billsModel.ts";
billsModel.fetch();
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
@Component({
  components: { BillItem }
})
export default class Statistics extends Vue {
  billList = billsModel.data;
  displayBills = billsModel.display("expend", "day");
  type = "expend";
  period = "day";
  @Watch("type")
  onTypeChanged() {
    this.displayBills = billsModel.display(this.type, this.period);
  }
  @Watch("period")
  onPeriodChanged() {
    this.displayBills = billsModel.display(this.type, this.period);
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
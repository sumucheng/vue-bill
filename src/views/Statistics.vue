<template>
  <Layout :type.sync="type">
    <div class="billList">
      <div v-for="bills in displayBills" :key="bills.data[0].time">
        <Time :time="bills.date" />
        <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import BillItem from "@/components/statistics/Bill.vue";
import Time from "@/components/statistics/Time.vue";
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
  components: { BillItem, Time }
})
export default class Statistics extends Vue {
  billList = billsModel.data;
  displayBills = billsModel.display("expend");
  type = "expend";

  @Watch("type")
  onTypeChanged() {
    this.displayBills = billsModel.display(this.type);
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
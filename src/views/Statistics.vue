<template>
  <Layout :type.sync="type">
    <div class="billList">
      <div v-for="bills in displayBills" :key="bills.data[0].time">
        <div class="timeAndSum">
          <Time :time="bills.date" />
          <Sum :sum="bills.sum" :type="type" />
        </div>
        <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import BillItem from "@/components/statistics/Bill.vue";
import Time from "@/components/statistics/Time.vue";
import Sum from "@/components/statistics/Sum.vue";
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
  components: { BillItem, Time, Sum }
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
  .timeAndSum {
    margin: 5px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $grey;
    font-size: $font-size-m;
  }
}
</style>
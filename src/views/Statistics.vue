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
  components: { Tabs, Bill }
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
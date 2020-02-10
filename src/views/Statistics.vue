<template>
  <Layout>
    <Title :now.sync="now" :expendAndIncome="expendAndIncome" />
    <div class="panel">
      <Tabs :titles="titles" :selected.sync="selectedTitle" />
      <div v-if="selectedTitle==='流水'" class="billList">
        <NoData v-if="displayBills.length===0" />
        <div v-else>
          <div v-for="bills in displayBills" :key="bills.data[0].time" class="oneDay">
            <div class="timeAndSum">
              <Time :time="bills.date" />
              <Sum :sum="bills.sum" />
            </div>
            <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
          </div>
        </div>
      </div>
      <Category v-else :sortedBills="sortedBills" />
    </div>
  </Layout>
</template>
 
<script lang="ts">
type Bill = {
  type: string;
  tag: string;
  note: string;
  count: string;
  time: number;
};
import BillItem from "@/components/statistics/Bill.vue";
import Time from "@/components/statistics/Time.vue";
import Sum from "@/components/statistics/Sum.vue";
import Title from "@/components/layout/Title.vue";
import NoData from "@/components/statistics/NoData.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Category from "@/components/statistics/Category.vue";

import billsModel from "@/model/billsModel.ts";
billsModel.fetch();
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { BillItem, Time, Sum, Title, NoData, Tabs, Category }
})
export default class Statistics extends Vue {
  billList = billsModel.data;
  monthSum = billsModel.monthSum;

  now = new Date();
  sortedBills = billsModel.classify(this.now);
  displayBills = billsModel.display(this.now);
  expendAndIncome: { expend: number; income: number } | undefined;
  titles = ["流水", "分类"];
  selectedTitle = "流水";
  created() {
    this.expendAndIncome = this.sum(this.now) || { expend: 0, income: 0 };
  }

  sum(now: Date) {
    for (let i of this.monthSum) {
      if (i.year === now.getFullYear() && i.month === now.getMonth()) {
        return { expend: i.expend, income: i.income };
        break;
      }
    }
    return { expend: 0, income: 0 };
  }

  @Watch("now")
  onNowChanged() {
    this.expendAndIncome = this.sum(this.now);
    this.displayBills = billsModel.display(this.now);
    this.sortedBills = billsModel.classify(this.now);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 80px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
  .billList {
    max-height: 100%;
    overflow: auto;
    .oneDay {
      margin-top: 10px;
      &:last-child {
        padding-bottom: 40px;
      }
      .timeAndSum {
        margin: 5px 20px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        color: $grey;
        font-size: $font-size-s;
      }
    }
  }
}
</style>
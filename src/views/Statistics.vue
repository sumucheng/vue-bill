<template>
  <Layout>
    <Title :now.sync="now" :expendAndIncome="expendAndIncome" />
    <div class="panel">
      <Tabs :initSelected="selectedTitle" />
      <div class="billList">
        <NoData v-if="oneDayBills.length===0" />
        <div v-else>
          <div v-for="bills in oneDayBills" :key="bills.data[0].time" class="oneDay">
            <div class="timeAndSum">
              <Time :time="bills.date" />
              <Sum :sum="bills.sum" />
            </div>
            <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
 
<script lang="ts">
import BillItem from "@/components/statistics/Bill.vue";
import Time from "@/components/statistics/Time.vue";
import Sum from "@/components/statistics/Sum.vue";
import Title from "@/components/layout/Title.vue";
import NoData from "@/components/statistics/NoData.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import billsModel from "@/model/billsModel.ts";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { BillItem, Time, Sum, Title, NoData, Tabs }
})
export default class Statistics extends Vue {
  billList = window.billList;
  monthSum = billsModel.monthSum;
  type = "expend";
  now = new Date();
  oneDayBills = billsModel.display(this.now);
  expendAndIncome: { expend: number; income: number } | undefined;
  selectedTitle = "detail";
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
    this.oneDayBills = billsModel.display(this.now);
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
<template>
  <Layout>
    <Title :now="now" :expendAndIncome="expendAndIncome" />
    <div class="panel">
      <div v-if="displayBills.length===0" class="noData">暂无数据</div>
      <div v-else class="billList">
        <div v-for="bills in displayBills" :key="bills.data[0].time" class="oneDay">
          <div class="timeAndSum">
            <Time :time="bills.date" />
            <Sum :sum="bills.sum" />
          </div>
          <BillItem v-for="bill in bills.data" :key="bill.time" :bill="bill" />
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
  components: { BillItem, Time, Sum, Title }
})
export default class Statistics extends Vue {
  billList = billsModel.data;
  monthSum = billsModel.monthSum;
  displayBills = billsModel.display();
  now = new Date();
  expendAndIncome: { expend: number; income: number } | undefined;
  created() {
    this.expendAndIncome = this.sum(this.now) || { expend: 0, income: 0 };
  }

  sum(now: Date) {
    console.log(this.monthSum);
    for (let i of this.monthSum) {
      if (i.year === now.getFullYear() && i.month === now.getMonth()) {
        return { expend: i.expend, income: i.income };
        break;
      }
    }
  }
  @Watch("now")
  onNowChanged() {
    this.expendAndIncome = this.sum(this.now)!;
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
  .noData {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: $font-size-m;
    color: $grey;
  }
  .billList {
    max-height: 100%;
    overflow: auto;
    .oneDay {
      margin-top: 20px;
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
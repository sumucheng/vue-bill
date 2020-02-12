<template>
  <Layout>
    <Title :now.sync="now" :expendAndIncome="expendAndIncome" />
    <div class="panel">
      <Tabs :titles="titles" :selected.sync="selectedTitle" />
      <div v-if="selectedTitle==='流水'" class="billList">
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
      <div v-else class="category">
        <div class="switch">
          <button @click="type='income'" :class="{active:type==='income'}" class="left">收</button>
          <button @click="type='expend'" :class="{active:type==='expend'}" class="right">支</button>
        </div>
        <Chart :oneDayBills="oneDayBills" :type="type" />
        <List
          :sortedBills="sortedBills"
          :expendAndIncome="expendAndIncome"
          :type="type"
          :now="now"
        />
      </div>
    </div>
  </Layout>
</template>
 
<script lang="ts">
import BillItem from "@/components/statistics/BillS.vue";
import Time from "@/components/statistics/Time.vue";
import Sum from "@/components/statistics/Sum.vue";
import Title from "@/components/layout/Title.vue";
import NoData from "@/components/statistics/NoData.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Chart from "@/components/statistics/Chart.vue";
import List from "@/components/statistics/List.vue";
import billsModel from "@/model/billsModel.ts";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { BillItem, Time, Sum, Title, NoData, Tabs, Chart, List }
})
export default class Statistics extends Vue {
  billList = window.billList;
  monthSum = billsModel.monthSum;
  type = "expend";
  now = new Date();
  sortedBills = billsModel.classify(this.now);
  oneDayBills = billsModel.display(this.now);
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
    this.oneDayBills = billsModel.display(this.now);
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
  .category {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    padding-bottom: 40px;
    position: relative;
    .switch {
      position: absolute;
      right: 20px;
      top: 5px;
      z-index: 5;
      display: flex;
      button {
        background-color: white;
        color: $orange;
        width: 24px;
        height: 22px;
        overflow: hidden;
        border: 1px solid $orange;
        display: flex;
        justify-content: center;
        align-items: center;
        &.active {
          background-color: $orange;
          color: white;
        }
        &.left {
          border-top-left-radius: $border-radius-s;
          border-bottom-left-radius: $border-radius-s;
          border-right: none;
        }
        &.right {
          border-top-right-radius: $border-radius-s;
          border-bottom-right-radius: $border-radius-s;
          border-left: none;
        }
      }
    }
  }
}
</style>
<template>
  <Layout>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :initSelected="selectedTitle" />
      <div class="category">
        <div class="switch">
          <button @click="type='income'" :class="{active:type==='income'}" class="left">收</button>
          <button @click="type='expend'" :class="{active:type==='expend'}" class="right">支</button>
        </div>
        <Chart :oneDayBills="oneDayBills" :type="type" />
        <List :sortedBills="sortedBills" :expendAndIncome="data" :type="type" :now="now" />
      </div>
    </div>
  </Layout>
</template>
 
<script lang="ts">
import Title from "@/components/layout/Title.vue";
import Tabs from "@/components/statistics/Tabs.vue";
import Chart from "@/components/category/Chart.vue";
import List from "@/components/category/List.vue";
import billsModel from "@/model/billsModel.ts";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  components: { Title, Tabs, Chart, List }
})
export default class Statistics extends Vue {
  monthSum = billsModel.monthSum;
  type = "expend";
  now = new Date();
  sortedBills = billsModel.classify(this.now);
  oneDayBills = billsModel.display(this.now);
  data:
    | {
        expend: number;
        income: number;
        rest: number;
        averageExpend: string;
        averageIncome: string;
      }
    | undefined;
  headerTitle: { text: string; count: number | string }[] = [];
  selectedTitle = "category";

  created() {
    this.data = this.sum(this.now);
    this.headerTitle = this.text();
  }

  text() {
    const averageText =
      this.type === "expend" ? "平均每日支出" : "平均每日收入";
    const average =
      this.type === "expend"
        ? this.data!.averageExpend
        : this.data!.averageIncome;
    return [
      { text: "结余", count: this.data!.rest },
      { text: averageText, count: average }
    ];
  }

  sum(now: Date) {
    for (let i of this.monthSum) {
      if (i.year === now.getFullYear() && i.month === now.getMonth()) {
        const dayOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return {
          expend: i.expend,
          income: i.income,
          rest: i.expend - i.income,
          averageExpend: (i.expend / dayOfMonth[i.month]).toFixed(2),
          averageIncome: (i.income / dayOfMonth[i.month]).toFixed(2)
        };
        break;
      }
    }
    return {
      expend: 0,
      income: 0,
      rest: 0,
      averageExpend: "0",
      averageIncome: "0"
    };
  }

  @Watch("now")
  onNowChanged() {
    this.data = this.sum(this.now);
    this.oneDayBills = billsModel.display(this.now);
    this.sortedBills = billsModel.classify(this.now);
    this.headerTitle = this.text();
  }
  @Watch("type")
  onTypeChanged() {
    this.headerTitle = this.text();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/normal.scss";
.navText {
  color: $blue;
}
.panel {
  position: fixed;
  z-index: 2;
  top: 114px;
  bottom: 80px;
  background-color: white;
  width: 100%;
  border-radius: $border-radius-l;
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
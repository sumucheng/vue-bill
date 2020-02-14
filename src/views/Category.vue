<template>
  <Layout>
    <Title :now.sync="now" :headerTitle="headerTitle" />
    <div class="panel">
      <Tabs :initSelected="selectedTitle" />
      <div class="category">
        <SwitchType :text="switchText" :selected.sync="type" />
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
import SwitchType from "@/components/category/SwitchType.vue";
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "../store/store";
@Component({
  components: { Title, Tabs, Chart, List, SwitchType }
})
export default class Statistics extends Vue {
  monthSum = store.monthSum;
  type = "expend";
  switchText = [
    { en: "income", zh: "收" },
    { en: "expend", zh: "支" }
  ];
  now = new Date();
  sortedBills = store.OneTagBills(this.now);
  oneDayBills = store.oneDayBills(this.now);
  data: HeaderData | undefined;
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
          rest: (i.income - i.expend).toFixed(2),
          averageExpend: (i.expend / dayOfMonth[i.month]).toFixed(2),
          averageIncome: (i.income / dayOfMonth[i.month]).toFixed(2)
        };
        break;
      }
    }
    return {
      expend: 0,
      income: 0,
      rest: "0",
      averageExpend: "0",
      averageIncome: "0"
    };
  }

  @Watch("now")
  onNowChanged() {
    this.data = this.sum(this.now);
    this.oneDayBills = store.oneDayBills(this.now);
    this.sortedBills = store.OneTagBills(this.now);
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
  }
}
</style>